CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT
);

INSERT INTO products SET
product_name = "Travel Mug (24oz)",
department_name = "Household",
price = 18.95,
stock_quantity = 50;

INSERT INTO products SET
product_name = "Thermos (16oz)",
department_name = "Household",
price = 14.95,
stock_quantity = 30;

INSERT INTO products SET
product_name = "Art + Coffee Book",
department_name = "Books",
price = 11.95,
stock_quantity = 30;

INSERT INTO products SET
product_name = "Instant Coffee Mix (1 Serving)",
department_name = "Food/Refreshment",
price = 3.95,
stock_quantity = 100;


INSERT INTO products SET
product_name = "French Press",
department_name = "Household",
price = 26.95,
stock_quantity = 25;


INSERT INTO products SET
product_name = "Decaf Espresso Dark Roast Beans (16oz)",
department_name = "Food/Refreshment",
price = 12.95,
stock_quantity = 40;

INSERT INTO products SET
product_name = "Veranda Blonde Roast Beans (16oz)",
department_name = "Food/Refreshment",
price = 14.95,
stock_quantity = 50;

INSERT INTO products SET
product_name = "Organic Yuko Medium Roast Beans (16oz)",
department_name = "Food/Refreshment",
price = 17.95,
stock_quantity = 35;

INSERT INTO products SET
product_name = "Guatemala Medium Roast Beans (16oz)",
department_name = "Food/Refreshment",
price = 14.95,
stock_quantity = 75;


INSERT INTO products SET
product_name = "Loose Leaf Tea - Mint (8oz)",
department_name = "Food/Refreshment",
price = 7.95,
stock_quantity = 25;

INSERT INTO products SET
product_name = "Loose Leaf Tea - Chamomile (8oz)",
department_name = "Food/Refreshment",
price = 7.95,
stock_quantity = 25;

INSERT INTO products SET
product_name = "Honey Lemon Tea Bags (16 Tea Bags)",
department_name = "Food/Refreshment",
price = 7.95,
stock_quantity = 25;

SELECT * FROM products;

UPDATE products SET stock_quantity = 25 WHERE item_id = 5;

DELETE FROM products WHERE item_id = 13;
DROP TABLE products;

CREATE TABLE departments (
department_id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL,
over_head_costs DECIMAL(10,2) DEFAULT 100
);

INSERT INTO departments SET department_name = "Household", over_head_costs = 250;
INSERT INTO departments SET department_name = "Books", over_head_costs = 125;
INSERT INTO departments SET department_name = "Food/Refreshment", over_head_costs = 250;

ALTER TABLE products ADD product_sales INT DEFAULT 0;

UPDATE products SET stock_quantity = 50, product_sales = 0 WHERE item_id = 1;

SELECT * FROM departments;

DROP TABLE departments;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_id;

INSERT INTO departments SET department_name = "", over_head_costs = ;