# from fastapi import FastAPI
import sqlite3
from crud import add_product, filter_by_category, search_product, view_products, generate_sales_report
from crud import update_product
from crud import delete_product


# app = FastAPI()

# connection = sqlite3.connect("../database/inventory.db")
# cursor = connection.cursor()

# product_name = input("Enter product name: ")
# category = input("Enter category: ")
# price = float(input("Enter unit price: "))

# cursor.execute('''
#     INSERT INTO products (product_name, category, unit_price)
#                VALUES(?, ?, ?)
# ''', (product_name, category, price))
# connection.commit() 

# print(f"Product inserted successfully.")

while True:
    print("\n === Smart Inventory System ===")
    print("1. Add Product")
    print("2. View Product")
    print("3. Update Product")
    print("4. Delete Product")
    print("5. Search Product")
    print("6. Filter by Category")
    print("7. Generate Sales Report")
    print("8. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_product()
    elif choice == "2":
        view_products()
    elif choice == "3":
        update_product()
    elif choice == "4":
        search_product()
    elif choice == "5":
        delete_product()
    elif choice == "6":
        filter_by_category()
    elif choice == "7":
        generate_sales_report()
    elif choice == "8":
        print("Thank You for using the Smart Inventory System.")
        break
    else:
        print("Invalid choice. Please try again.")

# @app.get("/")
# def home():
#     return {"message": "Hello, World!"}

# connection.close()