import sqlite3
import pandas as pd

connection = sqlite3.connect("../database/inventory.db")

query = ''' 
SELECT 
        p.product_id,
        p.category,
        p.unit_price,
        i.quantity,
        s.quantity_sold
FROM products p
JOIN inventory i
ON p.product_id = i.product_id
JOIN sales s
ON p.product_id = s.product_id
'''

df = pd.read_sql_query(query,connection)
connection.close()

print(df.head())

# x = df[["unit_price" , "quantity"]]
# y = df["quantity_sold"]

# print(x.head())
# print(y.head())

print(df.info())
print(df.describe())

# Missing Values #

print(df.isnull().sum())

# Duplicate Rows
print("Duplicate Rows:",
      df.duplicated().sum())

# Seperate Features and Target
X = df[["category", "unit_price", "quantity"]]
Y = df["quantity_sold"]

print(X.head())
print(type(Y))
print(Y.head())