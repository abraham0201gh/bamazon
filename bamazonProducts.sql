
DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(5) NULL,
  PRIMARY KEY (item_id)
);  


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("zPhone 24", "Electronics", 1250, 5010);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("zPhone 12", "Electronics", 800, 3017);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zebra Phone Case", "Electronics", 40.25, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Icelandic Backpack", "Sporting Goods", 65, 112);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ironman Compass", "Sporting Goods", 45, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Volcano Hiking Boots", "Shoes", 155, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avocado Powerbar", "Health", 2, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iceberg Water", "Health", 1.75, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cargo Pants", "Clothing", 68, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hello World Caps","Entertainment", 14.92, 8);


-- ### Alternate way to insert more than one row (all ten VALUES strung together under one INSERT, below just shows 3 as an example)
-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("zPhone 124", "Electronics", 1250, 5010), ("Zebra Phone Case ", "Electronics", 40.50, 2500), ("strawberry", 3.25, 75);


-- This line is to test table creation
SELECT * FROM products;


