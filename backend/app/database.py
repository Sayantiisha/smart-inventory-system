import sqlite3
from config import DB_PATH

# connection = sqlite3.connect(DB_PATH)
# cursor = connection.cursor()

# print("Connected to the database successfully.")

def get_connection():
    try:
        connection = sqlite3.connect("../database/inventory.db")
        print("Connected successfully")
        return connection
    except sqlite3.Error as e:
        print("Database Connection Error", e)
        return None

# connection = get_connection()

# cursor.execute("SELECT * FROM products")
# rows = cursor.fetchall()
# for row in rows:
#     print(row)

# connection.close()