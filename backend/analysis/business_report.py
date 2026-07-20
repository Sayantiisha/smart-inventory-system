import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px

connection = sqlite3.connect('../database/inventory.db')

query = "SELECT * FROM products"

df = pd.read_sql_query(query, connection)


# Total Products
len(df)

# Total Inventory Value
df['unit_price'].sum()

# Average Product Price 
df['unit_price'].mean()

# Maximun and Minimum Product Price
df['unit_price'].max()
df['unit_price'].min()

# Total Categories 
df['category'].nunique()

## Category-Wise Product count"
df['category'].value_counts()

# Most-Expensive 5 products 
df.sort_values(by="unit_price", ascending=False).head(5)

# Low Stock Products (Quantity < 10)
low_stock = df[df["stock_quantity"] < 10]

print(low_stock)
