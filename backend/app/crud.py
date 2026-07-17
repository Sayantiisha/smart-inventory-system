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



# connection.close()