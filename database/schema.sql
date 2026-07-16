CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(255) NOT NULL,
    category TEXT NOT NULL,
    unit_price REAL NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, category, unit_price, stock_quantity) VALUES
('Laptop', 'Electronics', 55000, 25),
('Mouse', 'Electronics', 700, 150),
('Keyboard', 'Electronics', 1500, 80),
('Monitor', 'Electronics', 3000, 40),
('Printer', 'Electronics', 5000, 20),
('Desk Chair', 'Furniture', 8000, 30),
('Office Desk', 'Furniture', 12000, 15),
('Notebook', 'Stationery', 50, 200),
('Pen', 'Stationery', 10, 500),
('Stapler', 'Stationery', 150, 100);

SELECT * FROM products;


-- ## Suppliers Table ##

CREATE TABLE suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    city TEXT
);

INSERT INTO suppliers (supplier_name, contact_person, email, phone, city) VALUES
('Tech Solutions Inc.', 'John Doe', 'john@techsolutions.com', '123-456-7890', 'Silicon Valley'),
('Office Supplies Co.', 'Jane Smith', 'jane@officesupplies.com', '098-765-4321', 'Business District'),
('Electronics World', 'Bob Johnson', 'bob@electronicsworld.com', '555-123-4567', 'Tech City');

SELECT * FROM products;