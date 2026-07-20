import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px

connection = sqlite3.connect('../database/inventory.db')

query = "SELECT * FROM products"

df = pd.read_sql_query(query, connection)

# Chart 1 : Category-Wise Product Count (Matplotlib)

category_count = df['category'].value_counts()

plt.figure(figsize=(8,5))
plt.bar(category_count.index , category_count.values)

plt.title ("Products by Category")
plt.xlabel("Category")
plt.ylabel("Number of Products")

plt.show()


# Chart 2 : Category Distribution (Plotly Pie Chart)

fig = px.pie(
    df,
    names = "category",
    title = "Category Distribution"
)
fig.show()


# Chart 3 : Top 10 Expensive Products 

top_products = df.sort_values(
    by = "unit_price",
    ascending= False
).head(10)

plt.figure(figsize=(10,5))

plt.bar (
        top_products['product_name'],
        top_products['unit_price']
)

plt.xticks (rotation=45)

plt.title("Top 10 Expensive Products")

plt.show()


# 4. Category-wise Average Price 
avg_price = (
    df.groupby("category") ["unit_price"].mean().reset_index()
)
fig = px.bar(avg_price)
fig.show()


connection.close()