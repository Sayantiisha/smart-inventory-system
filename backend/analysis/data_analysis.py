import sqlite3
import pandas as pd

connection = sqlite3.connect('../database/inventory.db')

query = "SELECT * FROM products"

df = pd.read_sql_query(query, connection)

# print(df)
# print(df.head())

# # 1. Duplicate Data Check
# print("Duplicate rows:")
# df_duplicates = df[df.duplicated()]
# print(df_duplicates)

# # 2. Missing Values Check
# print("\nMissing values:")
# print("\nMissing Values:")
# print(df.isnull().sum())

# print("\nRows with Missing Values:")
# print(df[df.isnull().any(axis=1)])


# # 3. Remove Duplicates Rows
# print("\nRemoving duplicate rows...")
# df = df.drop_duplicates()
# print("Duplicate rows removed.")

# # 4. Remove Extra Spaces
# print("\nRemoving extra spaces ")
# df["product_name"] = df["product_name"].str.strip()
# df["category"] = df["category"].str.strip()
# print("Extra spaces removed.")

# # 5. Convert Category to Lowercase
# print("\nConverting category to lowercase...")
# df["category"] = df["category"].str.lower()
# print("Category converted to lowercase.")

# # 6. Check Data Types
# print("\nData types:")
# print(df.dtypes)

# df.to_csv("clean_products.csv", index=False)


# 1. Total number of products
total_products = len(df)
print(f"\nTotal number of products: {total_products}")

# 2. How many products are there in each category
category_counts = df['category'].value_counts()
print("\nProducts in each category:")
print(category_counts)

# 3. Average price of products 
average_price = df['unit_price'].mean()
print(f"\nAverage price of products: {average_price}")

# 4. maximum and minimum price of products
max_price = df['unit_price'].max()
min_price = df['unit_price'].min()  
print(f"\nMaximum price of products: {max_price}")
print(f"\nMinimum price of products: {min_price}")

# 5. Top 5 most expensive products
top_5_products = df.sort_values(by='unit_price', ascending=False).head(5)
print("\nTop 5 most expensive products:")
print(top_5_products)

# 6. Category wise average price of products
category_avg_price = df.groupby('category')['unit_price'].mean()
print("\nCategory wise average price of products:")
print(category_avg_price)

# 7. Category wise maximum number of products
category_max_products = df.groupby('category').size().max()
print(f"\nCategory wise maximum number of products: {category_max_products}")

connection.close()