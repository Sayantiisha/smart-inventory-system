import sqlite3
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from datetime import datetime, timedelta

Connection = sqlite3.connect("../database/inventory.db")
cursor = Connection.cursor()

query = ''' 
SELECT 
        p.product_id,
        p.category,
        p.unit_price,
        i.quantity,
        s.quantity_sold,
        s.sale_date
FROM products p
JOIN inventory i
ON p.product_id = i.product_id
JOIN sales s
ON p.product_id = s.product_id
'''
df = pd.read_sql_query(query,Connection)

print(df.columns)

#  convert sale_date
df['sale_date'] = pd.to_datetime(df["sale_date"])

# add new feature
df["month"] = df["sale_date"].dt.month

# category Encode
# Normalize category strings before fitting the encoder so predictions are consistent
# across input casing and small label variations.
df["category"] = df["category"].fillna("").astype(str).str.strip().str.lower()
encoder = LabelEncoder()
encoder.fit(df["category"])
df["category"] = encoder.transform(df["category"])

# Final features
X = df [
    [
        "category",
        "unit_price",
        "quantity",
        "month"
    ]
]

Y = df["quantity_sold"]

print(X.head())
print(Y.head())