from fastapi import APIRouter, HTTPException
from app.database import get_connection
from .schemas import ProductCreate , ProductUpdate , PredictionRequest
import joblib 
import pandas as pd


router = APIRouter()

@router.get(
        "/products",
        summary="Get all Products",
        description=" Returns all Products from the Inventory Database."
        )
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
        WHERE product_id = ?,
        """
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