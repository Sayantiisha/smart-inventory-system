-- ## Products Table ##
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(255) NOT NULL,
    category TEXT NOT NULL,
    unit_price REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, category, unit_price) VALUES
('Laptop', 'Electronics', 55000),
('Mouse', 'Electronics', 700),
('Keyboard', 'Electronics', 1500),
('Monitor', 'Electronics', 3000),
('Printer', 'Electronics', 5000),
('Desk Chair', 'Furniture', 8000),
('Office Desk', 'Furniture', 12000),
('Notebook', 'Stationery', 50),
('Pen', 'Stationery', 10),
('Stapler', 'Stationery', 150);

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


-- ## Inventory Table ##

CREATE TABLE inventory (
    inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    supplier_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    reorder_level INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

INSERT INTO inventory (product_id, supplier_id, quantity, reorder_level) VALUES
(1, 1, 25, 5),
(2, 1, 150, 20),
(3, 1, 80, 15),
(4, 1, 40, 10),
(5, 1, 20, 5),
(6, 2, 30, 10),
(7, 2, 15, 5),
(8, 3, 200, 50),
(9, 3, 500, 100),
(10, 3, 100, 20);


-- ## Sales Table ##
CREATE TABLE sales (
    sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity_sold INTEGER NOT NULL,
    sale_date TIMESTAMP DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES
(1, 2, '2023-10-01'),
(2, 5, '2023-10-02'),
(3, 3, '2023-10-03'),
(4, 1, '2023-10-04'),
(5, 4, '2023-10-05'),
(6, 2, '2023-10-06'),
(7, 1, '2023-10-07'),
(8, 6, '2023-10-08'),
(9, 10, '2023-10-09'),
(10, 5, '2023-10-10');

SELECT * FROM sales;

-- how many products are in the products table
SELECT COUNT(*) AS total_products FROM products;

-- how many Stocks are avaialable in Warehouse
SELECT SUM(quantity) AS total_stock FROM inventory;


-- ## Warehouse Products Stock ##
SELECT p.product_name, i.quantity
FROM products p
INNER JOIN inventory i ON p.product_id = i.product_id;


-- ## JOIN ##
SELECT
    p.product_name,
    s.quantity_sold,
    s.sale_date
FROM products p
INNER JOIN sales s ON p.product_id = s.product_id

SELECT
    p.product_name,
    i.quantity,
    i.reorder_level
FROM products p
INNER JOIN inventory i ON p.product_id = i.product_id
INNER JOIN suppliers s ON i.supplier_id = s.supplier_id


--  ## Total Product Sales ##
SELECT COUNT(*) AS total_products 
FROM products;

-- ## Total Stock ##
SELECT SUM(stock_quantity) AS total_stock
FROM products;

-- ## Average Price ##
SELECT AVG(unit_price) AS average_price
FROM products;

-- ## Maximum Price of Product ##
SELECT MAX(unit_price) AS highest_price
FROM products;

-- ## Minimum Price of Product ##
SELECT MIN(unit_price) AS lowest_price
FROM products;


SELECT category, COUNT(*) AS total_products
FROM products
GROUP BY category;

SELECT category, AVG(unit_price) AS average_price
FROM products
GROUP BY category;


-- ## Low Stock Products ##
SELECT p.product_name, i.quantity, i.reorder_level
FROM products p
INNER JOIN inventory i ON p.product_id = i.product_id
WHERE i.quantity <= i.reorder_level;
ORDER BY i.quantity ASC
LIMIT 1;


-- ## Top Selling Products ##
SELECT p.product_name, SUM(s.quantity_sold) AS total_sold
FROM products p
INNER JOIN sales s ON p.product_id = s.product_id
GROUP BY p.product_name
ORDER BY total_sold DESC;

-- ## Inventory Value ##
SELECT SUM(i.quantity * p.unit_price) AS inventory_value
FROM inventory i
INNER JOIN products p ON i.product_id = p.product_id;


-- ## Products Stock less than 50 ##
SELECT p.product_name, i.quantity
FROM products p
INNER JOIN inventory i ON p.product_id = i.product_id
WHERE i.quantity < 50;

-- ## Most Expensive 3 Products ##
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 3;