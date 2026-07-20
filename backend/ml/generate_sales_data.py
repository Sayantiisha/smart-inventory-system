import sqlite3
import random
from datetime import datetime, timedelta

Connection = sqlite3.connect("../database/inventory.db")
cursor = Connection.cursor()

start_date = datetime(2024, 1, 1)

for i in range(300):
    product_id = random.randint(1,10)
    quantity_sold = random.randint(1, 20)
    random_days = random.randint(0, 180)
    sale_date = start_date + timedelta(days= random_days) 

    cursor.execute ("""
        INSERT INTO 
    sales (product_id , quantity_sold, sale_date)
    VALUES (?,?,?)
""",(
     product_id,
    quantity_sold,
    sale_date.strftime("%Y-%m-%d")
))
Connection.commit()
Connection.close()

print("300 Sales Records Inserted Successfully")