from fastapi import APIRouter, HTTPException
from app.database import get_connection
from .schemas import ProductCreate , ProductUpdate , PredictionRequest
import joblib 
import pandas as pd
from app.crud import  generate_sales_report, generate_inventory_report

router = APIRouter()


@router.get(
        "/products",
        summary="Get all Products",
        description=" Returns all Products from the Inventory Database."
        )

@router.get("/sales-report")
def sales_report():
    return generate_sales_report()

@router.get("/inventory-report")
def inventory_report():
    return generate_inventory_report()


def get_products():
    connection = get_connection()

    if connection is None:
        return {"error": "Database connection failed"}

    cursor = connection.cursor()

    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()

    connection.close()

    products = []

    for row in rows:
        products.append({
            "product_id": row[0],
            "product_name": row[1],
            "category": row[2],
            "unit_price": row[3]
        })

    return products


@router.post(
        "/products",
        summary="Add New Product",
        description="Adds a new product to the inventory database.")
def add_product(
    product : ProductCreate):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO products (product_name, category, unit_price)
        VALUES (?, ?, ?)
        """,
        (
            product.product_name,
            product.category,
            product.unit_price
        )
    )

    connection.commit()
    connection.close()

    return{
        "message" : "Product added Successfully"
    }



@router.put(
    "/products/{product_id}", 
    summary="Update Product",
    description="Updates the details of an existing product using its Product ID.")
def update_product(
    product_id:int,
    product : ProductUpdate
           ):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE products 
        SET product_name = ?,
        category = ? ,
        unit_price = ? 
        WHERE product_id = ?
        """,
        (
            product.product_name,
            product.category,
            product.unit_price,
            product_id
        )
    )

    connection.commit()

    if cursor.rowcount == 0:
        connection.close()
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )
          
    connection.close()

    return{
        "message" : "Product updated Successfully."
    }


@router.delete(
        "/products/{product_id}",
        summary="Delete Product",
        description="Deletes a product from the inventory database using its Product ID.")
def delete_product(product_id : int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        DELETE FROM products WHERE product_id = ?
        """,
        (product_id,)
    )

    connection.commit()

    if cursor.rowcount == 0:
        connection.close()
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )
       
    connection.close()

    return {
        "message" : "Product Deleteed Successfully!"
    }

## Model and Encoder Load 
model = joblib.load("ml/saved_models/inventory_prediction_model.pkl")
encoder = joblib.load("ml/saved_models/category_encoder.pkl")


## Prediction API ##
@router.post(
        "/predict",
        summary="Predict Product Sales",
        description="Predicts future product sales using the trained Machine Learning model based on category, unit price, quantity, and month.")
def predict_sales(data : PredictionRequest):
    try:
        category = encoder.transform([data.category])[0]
    except:
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    input_data = pd.DataFrame({
        "category" : [category],
        "unit_price" : [data.unit_price],
        "quantity" : [data.quantity],
        "month" : [data.month]
    })

    prediction = model.predict(input_data)

    return {
        "predicted_sales" : int(round(prediction[0]))
    }


## Get Product by ID ##
@router.get(
        "/products/{product_id}", 
        summary="Get Product by ID",
       description="Retrieves detailed information of a specific product using its Product ID.")
def get_product(product_id : int):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM products
        WHERE product_id = ?
        """,
        (product_id,)
    )

    product = cursor.fetchone()
    connection.close()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail= "Product not found."
        )
    
    return {
        "product_id": product[0],
        "product_name": product[1],
        "category": product[2],
        "unit_price": product[3]
    }


## Health Check API ##
@router.get("/health")
def health_check():
    return{
        "status" :"OK",
        "message" : "API is running successfully"
    } 


@router.get("/dashboard/stats")
def dashboard_stats():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]

    cursor.execute("SELECT AVG(unit_price) FROM products")
    average_price = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(unit_price) FROM products")
    total_value = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(DISTINCT category) FROM products")
    total_categories = cursor.fetchone()[0]

    connection.close()

    return {
        "total_products" : total_products,
        "average_price" : round(average_price, 2),
        "total_inventory_value" : round(total_value, 2),
        "total_categories" : total_categories
    }


## Monthly Sales Graph ##

@router.get("/dashboard/monthly-sales")
def monthly_sales():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            strftime('%m',sale_date) AS month,
            SUM(quantity_sold) AS total_sales
            FROM sales
            GROUP BY month
            ORDER BY month
""")
    rows = cursor.fetchall()
    connection.close()

    month_names = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    }

    return [
        {
            "month": month_names[row[0]],
            "sales": row[1]
        }
        for row in rows
    ]


##  Category-Wise Pie Chart ##
@router.get("/dashboard/category-sales")
def category_sales():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            p.category,
            SUM(s.quantity_sold) AS sales
        FROM sales s
        JOIN products p
        ON s.product_id = p.product_id
        GROUP BY p.category
        ORDER BY sales DESC;

    """)

    rows = cursor.fetchall()
    connection.close()

    return [
        {
            "category" : row[0],
            "sales" : row[1]
        }
        for row in rows
    ];


## Low Stock Alert ##
@router.get("/low-stock")
def low_stock():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            p.product_id,
            p.product_name,
            p.category,
            i.quantity
        FROM products p
        JOIN inventory i
        ON p.product_id = i.product_id
        WHERE i.quantity < 20
        ORDER BY i.quantity ASC;

    """)

    rows = cursor.fetchall()
    connection.close()

    return [
        {
            "product_id" : row[0],
            "product_name" : row[1],
            "category" : row[2],
            "quantity" : row[3]
        }
        for row in rows
    ];
