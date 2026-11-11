-- MySQL Developer Handbook: companion practice lab
-- Target: MySQL 8.4 / compatible MySQL 8.0 features.
-- WARNING: This script DROPS developer_lab if it already exists.
-- Run only on a disposable local development server.

DROP DATABASE IF EXISTS developer_lab;
CREATE DATABASE developer_lab
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE developer_lab;

CREATE TABLE customers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(30) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_customers_email UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(60) NOT NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_products_sku UNIQUE (sku),
    CONSTRAINT chk_products_price CHECK (unit_price >= 0)
) ENGINE=InnoDB;

CREATE TABLE orders (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    customer_id BIGINT UNSIGNED NOT NULL,
    order_number VARCHAR(40) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    ordered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_orders_order_number UNIQUE (order_number),
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_orders_customer_date (customer_id, ordered_at)
) ENGINE=InnoDB;

CREATE TABLE order_items (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_price CHECK (unit_price >= 0),
    INDEX idx_order_items_product (product_id)
) ENGINE=InnoDB;

INSERT INTO customers (first_name, last_name, email, phone) VALUES
('Asha', 'Sen', 'asha@example.test', '+91-9000000001'),
('Ravi', 'Das', 'ravi@example.test', '+91-9000000002'),
('Mina', 'Roy', 'mina@example.test', '+91-9000000003'),
('Kabir', 'Sen', 'kabir@example.test', NULL);

INSERT INTO products (sku, name, description, unit_price, stock_quantity) VALUES
('KB-001', 'Mechanical Keyboard', 'Compact wired keyboard', 2499.00, 20),
('MS-001', 'Wireless Mouse', 'Wireless optical mouse', 899.00, 35),
('MN-001', '24-inch Monitor', 'Full HD display', 8999.00, 10),
('CB-001', 'USB-C Cable', '1 metre cable', 399.00, 50);

INSERT INTO orders (customer_id, order_number, status) VALUES
(1, 'ORD-2026-0001', 'pending'),
(2, 'ORD-2026-0002', 'processing'),
(1, 'ORD-2026-0003', 'completed');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 2499.00),
(1, 2, 2, 899.00),
(2, 3, 1, 8999.00),
(2, 4, 3, 399.00),
(3, 2, 1, 899.00);

-- First checks
SHOW TABLES;
DESCRIBE customers;
SELECT * FROM customers;
SELECT * FROM products;

-- Join report
SELECT
    o.order_number,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.status,
    SUM(oi.quantity * oi.unit_price) AS order_total
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
JOIN order_items AS oi ON oi.order_id = o.id
GROUP BY o.id, o.order_number, c.first_name, c.last_name, o.status
ORDER BY o.ordered_at DESC;

-- Product revenue report
SELECT
    p.sku,
    p.name,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM products AS p
JOIN order_items AS oi ON oi.product_id = p.id
GROUP BY p.id, p.sku, p.name
ORDER BY revenue DESC;

-- Query-plan practice
EXPLAIN
SELECT id, order_number, ordered_at
FROM orders
WHERE customer_id = 1
ORDER BY ordered_at DESC;

-- View practice
CREATE OR REPLACE VIEW order_summary AS
SELECT
    o.id AS order_id,
    o.order_number,
    o.status,
    o.ordered_at,
    c.email AS customer_email
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;

SELECT * FROM order_summary;
