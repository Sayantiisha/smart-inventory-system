 # Product Insert #

from database import get_connection

import sqlite3


connection = get_connection()
cursor = connection.cursor()

def add_product():
    connection = get_connection()
    cursor = connection.cursor()
    product_name = input("Enter product name: ").strip()
    if not product_name:
        print("Product name cannot be empty.")
        return
    category = input("Enter category: ")
    try:
        price = float(input("Enter unit price: "))
    except ValueError:
        print("Invalid price. Please enter a valid number.")
        return
    cursor.execute('''
    INSERT INTO products (product_name, category, unit_price)
            VALUES(?, ?, ?)
    ''', (product_name, category, price))
    connection.commit()
    print("Product inserted successfully.")

    connection.commit()
    connection.close()


# View Products #
def view_products():
    connection = get_connection()
    if connection is None:
        print("Database Connection Failed")
        return
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    print ("Rows =", rows )

    if not rows: print("No products Found")
    else:

        for row in rows:
            print(row)

        connection.close()



# Product Update #

def update_product():
    product_name = input("Enter product name: ").strip()
    if not product_name:
        print("Product name cannot be empty.")
        return
    try:
        new_price = float(input("Enter new unit price: "))
    except ValueError:
        print("Invalid price. Please enter a valid number.")
        return
    cursor.execute('''
        UPDATE products
        SET unit_price = ?
        WHERE product_name = ?
    ''', (new_price, product_name))

    if cursor.rowcount == 0:
        print("No product found with the given name.")
    else:
        print(f"Product Updated successfully.")


    connection.commit()


# Product Delete #
def delete_product():
    product_name = input("Enter product name: ").strip()
    if not product_name:
        print("Product name cannot be empty.")
        return
    cursor.execute('''
        DELETE FROM products    
        WHERE product_name = ?
        ''', (product_name,))
    
    if cursor.rowcount == 0:
        print("No product found with the given name.")
    else:
        print(f"Product(s) deleted successfully.")

    connection.commit()


def search_product():
    product_name = input("Enter product name to search: ").strip()
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute('''
        SELECT product_name, category, unit_price
        FROM products
        WHERE product_name = ?
    ''', (product_name,))
    product = cursor.fetchone()

    if product:
        print(f"Product Name: {product[0]}")
        print(f"Category: {product[1]}")
        print(f"Unit Price: {product[2]}")
    else:
        print("Product not found.")



def filter_by_category():
    category = input("Enter category to filter: ").strip()
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute('''
        SELECT product_name, category, unit_price
        FROM products
        WHERE category = ?
    ''', (category,))
    products = cursor.fetchall()

    if products:
        print(f"Products in category '{category}':")
        for product in products:
            print(f"Product Name: {product[0]}, Unit Price: {product[2]}")
    else:
        print(f"No products found in category '{category}'.")




## Sales Report Dashboard ##

# def generate_sales_report():
#     print("Sales Report:")

#     connection = get_connection()
#     cursor = connection.cursor()

#     # Report 1 : Total Products
#     cursor.execute("SELECT COUNT(*) FROM products")
#     total_products = cursor.fetchone()[0]
#     print(f"Total Products: {total_products}")


#     # Report 2 : Average Product Price
#     cursor.execute('''
#         SELECT category, AVG(unit_price) 
#         FROM products
#         GROUP BY category
#     ''')
#     # avg_price_result = cursor.fetchone()[0]
#     # avg_price = avg_price_result if avg_price_result  else 0
#     # print(f"Average Product Price: {avg_price:.2f}")
#     rows = cursor.fetchall()

#     print("\nAverage Product Price by Category")
#     print("-" * 40)

#     for category, avg_price in rows:
#      print(f"{category:<15} ₹{avg_price:.2f}")



#     # Report 3 : Most Expensive Product
#     cursor.execute('''
#         SELECT product_name, unit_price 
#         FROM products 
#         ORDER BY unit_price DESC 
#         LIMIT 1
#     ''')
#     most_expensive_product = cursor.fetchone()
#     if most_expensive_product:
#         print(f"Most Expensive Product: {most_expensive_product[0]} - Price: {most_expensive_product[1]}")
#     else:
#         print("No products found.")



#     # Report 4 (Bonus): Total Stock Value
#     try:
#         cursor.execute("""
#             SELECT SUM(p.unit_price * i.quantity) 
#             FROM products p 
#             JOIN inventory i 
#             ON p.product_id = i.product_id;
#         """)
#         total_stock_value = cursor.fetchone()[0]
#         stock_value = total_stock_value if total_stock_value else 0
#         print(f"Total Stock Value: ₹{stock_value:.2f}")
#     except Exception as e:
#         print("\n[Notice]: Could not calculate Stock Value (Inventory table might be missing).")

#     connection.close()



def generate_sales_report():

    connection = get_connection()
    cursor = connection.cursor()

    try:

        print("\n========== SALES REPORT ==========\n")

        # Total Products
        cursor.execute("SELECT COUNT(*) FROM products")
        total_products = cursor.fetchone()[0]
        print(f"Total Products : {total_products}")

        # Average Price
        cursor.execute("""
            SELECT category, AVG(unit_price)
            FROM products
            GROUP BY category
        """)

        print("\nAverage Product Price by Category")
        print("---------------------------------")

        for category, avg_price in cursor.fetchall():
            print(f"{category:<15} ₹{avg_price:.2f}")

        # Most Expensive Product
        cursor.execute("""
            SELECT product_name, unit_price
            FROM products
            ORDER BY unit_price DESC
            LIMIT 1
        """)

        product = cursor.fetchone()

        if product:
            print("\nMost Expensive Product")
            print("----------------------")
            print(f"Name  : {product[0]}")
            print(f"Price : ₹{product[1]:.2f}")

        # Total Stock Value
        try:
            cursor.execute("""
                SELECT SUM(p.unit_price * i.quantity)
                FROM products p
                JOIN inventory i
                ON p.product_id = i.product_id
            """)

            stock_value = cursor.fetchone()[0] or 0

            print(f"\nTotal Stock Value : ₹{stock_value:.2f}")

        except sqlite3.Error:
            print("\nInventory table not found.")

    finally:
        connection.close()
