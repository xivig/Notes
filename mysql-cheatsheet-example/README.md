# MySQL Developer Handbook
## Step-by-step, all-in-one SQL tutorial and everyday developer reference

A practical guide from first connection to production-minded database development. It is designed to be read in order, practised in a local MySQL database, and kept open as a daily SQL reference.

**Target:** MySQL 8.4 LTS syntax and features. Most examples also work on MySQL 8.0, but check version-specific behavior before using them in production.

> **Safety first:** Run the exercises in a development database, never directly against production. `DROP`, `TRUNCATE`, broad `UPDATE`, and broad `DELETE` statements can permanently remove data.

### Quick Repository Resources

* 📑 [**Everyday SQL Cheat Sheet (`CHEATSHEET.md`)**](CHEATSHEET.md) — Fast syntax lookup, daily command reference, index tips, transactions, and common mistakes.
* 🧪 [**Interactive Practice Lab (`mysql-developer-lab.sql`)**](mysql-developer-lab.sql) — Ready-to-run SQL script that creates a complete practice schema with customers, products, orders, order items, and reporting views.
  ```bash
  mysql -h 127.0.0.1 -u root -p < mysql-developer-lab.sql
  ```

---

# Learning path

| Stage | Learn | Deliverable |
|---|---|---|
| 0 | Install, connect, inspect server | Working MySQL connection |
| 1 | SQL language groups and data types | Understand schema vocabulary |
| 2 | Create database and tables | A normalized starter schema |
| 3 | Insert, read, update, delete | Working CRUD |
| 4 | Filter, sort, paginate | Useful search queries |
| 5 | Joins and relationships | Multi-table reports |
| 6 | Aggregates, subqueries, CTEs | Business summaries |
| 7 | Constraints, indexes, views | Safer, faster schema |
| 8 | Transactions and locking | Reliable money/order workflows |
| 9 | Security and application access | Safe application queries |
| 10 | Explain plans, tuning, backup | Operational readiness |
| 11 | Capstone project and exercises | Small order-management database |

---

# Stage 0 — Set up and connect

## 0.1 What is MySQL?

MySQL is a relational database management system (RDBMS). Data is organized into databases, tables, rows, and columns. SQL (Structured Query Language) is used to define structures, read data, change data, and manage access.

A simplified model:

```text
Database
└── Table: customers
    ├── Column: id
    ├── Column: name
    └── Row: (1, 'Asha')
```

## 0.2 Check your server version

Connect using MySQL Workbench, a terminal client, or another trusted SQL client.

```sql
SELECT VERSION();
SELECT CURRENT_USER();
SELECT DATABASE();
```

Terminal example:

```bash
mysql -u root -p
```

For a named host and database:

```bash
mysql -h 127.0.0.1 -P 3306 -u app_user -p app_db
```

Do not put passwords directly in shell history or source code. Let the client prompt for the password or use a protected credentials mechanism.

## 0.3 Useful first commands

```sql
SHOW DATABASES;
SELECT NOW();
SELECT USER();
SELECT CURRENT_USER();
STATUS;
```

`STATUS` is a command of the interactive `mysql` client, not a normal SQL statement. In GUI clients, inspect the connection/session panel instead.

## 0.4 SQL statement habits

- End SQL statements with `;`.
- SQL keywords are conventionally written in uppercase; identifiers are often lowercase.
- Use backticks around identifiers only when needed, such as reserved words or unusual names.
- Use single quotes for string values.
- Prefer explicit column lists in `INSERT`.
- Format multi-line queries so they are easy to review.

---

# Stage 1 — SQL language groups

The original cheat sheet groups SQL into DDL, DML, and DCL. A practical classification also includes transaction control and query statements.

| Group | Purpose | Common statements |
|---|---|---|
| DDL — Data Definition Language | Define or change schema objects | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| DML — Data Manipulation Language | Insert or change rows | `INSERT`, `UPDATE`, `DELETE`, `REPLACE` |
| DQL — Data Query Language | Read data | `SELECT` |
| DCL — Data Control Language | Manage permissions | `GRANT`, `REVOKE` |
| TCL — Transaction Control Language | Control transactions | `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

`SELECT` is often taught as DQL, though some classifications include it under DML. The label is less important than understanding what each statement does.

## 1.1 A quick command map

```sql
-- DDL
CREATE DATABASE demo;
CREATE TABLE demo.example (id INT PRIMARY KEY);
ALTER TABLE demo.example ADD COLUMN title VARCHAR(150);
DROP TABLE demo.example;

-- DML
INSERT INTO demo.example (id, title) VALUES (1, 'Hello');
UPDATE demo.example SET title = 'Updated' WHERE id = 1;
DELETE FROM demo.example WHERE id = 1;

-- DQL
SELECT id, title FROM demo.example;

-- DCL (requires suitable administrative privileges)
GRANT SELECT ON demo.* TO 'report_user'@'localhost';
REVOKE SELECT ON demo.* FROM 'report_user'@'localhost';

-- TCL (transaction control)
START TRANSACTION;
COMMIT;
ROLLBACK;
```

The permission examples assume the account exists and the executing account is allowed to grant privileges. Do not grant broad privileges to an application account.

---

# Stage 2 — MySQL data types

Choose a type based on the meaning, range, precision, and expected operations of the data—not merely on the example value.

## 2.1 Integer types

| Type | Signed range |
|---|---:|
| `TINYINT` | -128 to 127 |
| `SMALLINT` | -32,768 to 32,767 |
| `MEDIUMINT` | -8,388,608 to 8,388,607 |
| `INT` / `INTEGER` | -2,147,483,648 to 2,147,483,647 |
| `BIGINT` | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |

Use `UNSIGNED` when negative values are not meaningful and the larger non-negative range is useful.

```sql
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
```

**Modern note:** Avoid old-style integer display widths such as `INT(11)`. The number in parentheses was not a storage-size declaration; integer display width is deprecated/removed in modern MySQL behavior.

## 2.2 Exact and approximate numeric values

| Type | Use |
|---|---|
| `DECIMAL(p,s)` | Exact decimal values such as prices, balances, and rates |
| `FLOAT` | Approximate scientific/measurement values with lower precision |
| `DOUBLE` | Approximate floating-point values with greater precision than `FLOAT` |

For money, use an exact type:

```sql
unit_price DECIMAL(12,2) NOT NULL
```

Do not use `FLOAT` or `DOUBLE` for financial amounts where exact decimal arithmetic is required.

## 2.3 Text and binary types

| Type | Typical use |
|---|---|
| `CHAR(n)` | Fixed-length codes |
| `VARCHAR(n)` | Variable-length names, email addresses, labels |
| `TEXT` | Longer text |
| `MEDIUMTEXT`, `LONGTEXT` | Very large text |
| `BINARY`, `VARBINARY` | Binary values |
| `BLOB`, `MEDIUMBLOB`, `LONGBLOB` | Binary objects |

`VARCHAR` is not limited to 255 characters in modern MySQL. Its practical maximum depends on character set, row-size limits, and other columns. `TEXT` families have byte-size limits; choose them based on actual requirements.

For multilingual applications, normally use `utf8mb4` rather than the older `latin1` default found in many legacy examples.

## 2.4 Date and time types

| Type | Use |
|---|---|
| `DATE` | Calendar date |
| `TIME` | Time or duration |
| `DATETIME` | Date and time without automatic timezone conversion |
| `TIMESTAMP` | Date/time value with session-time-zone conversion behavior |
| `YEAR` | Year value |

Typical definitions:

```sql
birth_date DATE NULL,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
```

Use UTC consistently for application timestamps where possible, and convert to the user's timezone at the application boundary. Understand the difference between `DATETIME` and `TIMESTAMP` before choosing one.

## 2.5 Boolean, JSON, ENUM

```sql
is_active BOOLEAN NOT NULL DEFAULT TRUE,
settings JSON NULL,
status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft'
```

- `BOOLEAN` is an alias for `TINYINT(1)` in MySQL.
- `JSON` validates JSON documents and supports JSON functions.
- `ENUM` is appropriate only for a small, stable set of values. For frequently changing business states, a lookup table may be easier to evolve.
- `SET` stores multiple selections from a predefined set, but a many-to-many relationship is usually more flexible for relational data.

## 2.6 Type selection quick rules

- IDs: `BIGINT UNSIGNED` or `INT UNSIGNED`, based on expected scale.
- Money: `DECIMAL(p,s)`.
- Phone numbers: `VARCHAR`, not integer (leading zero and `+` matter).
- Email: `VARCHAR` with a suitable length and a deliberate uniqueness policy.
- Dates: `DATE` for date-only values; `DATETIME`/`TIMESTAMP` for moments.
- Long descriptions: `TEXT`.
- Passwords: store a secure password hash generated by the application, never plaintext.
- Images/documents: commonly store file/object storage paths and metadata rather than large binary files in the main relational row.

---

# Stage 3 — Create a safe practice database

We will build a small shop/order database. It provides examples of primary keys, foreign keys, relationships, CRUD, joins, transactions, and reports.

## 3.1 Create and select a database

```sql
CREATE DATABASE IF NOT EXISTS developer_lab
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE developer_lab;

SELECT DATABASE();
```

To remove a practice database, use this only after confirming it is the disposable lab:

```sql
-- DESTRUCTIVE: permanently removes the selected practice database.
DROP DATABASE developer_lab;
```

Never run destructive reset statements against a production database.

## 3.2 Create the customers table

```sql
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
```

## 3.3 Create the products table

```sql
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
```

## 3.4 Create orders and order items

An order can contain multiple products. The `order_items` table resolves that many-to-many relationship and stores the price at the time of purchase.

```sql
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
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_price CHECK (unit_price >= 0),
    INDEX idx_order_items_product (product_id)
) ENGINE=InnoDB;
```

**Why store `unit_price` in `order_items`?** Product prices can change. Historical orders must retain the price agreed at the time of purchase. This is a deliberate snapshot, not accidental duplication.

## 3.5 Inspect your schema

```sql
SHOW TABLES;
DESCRIBE customers;
SHOW CREATE TABLE orders;
SHOW INDEX FROM order_items;
```

`DESCRIBE` is a quick view; `SHOW CREATE TABLE` shows the full table definition, including constraints and indexes.

---

# Stage 4 — Insert data (CREATE)

## 4.1 Insert one row

```sql
INSERT INTO customers (first_name, last_name, email, phone)
VALUES ('Asha', 'Sen', 'asha@example.test', '+91-9000000001');
```

The `id` is generated automatically. Get it with:

```sql
SELECT LAST_INSERT_ID();
```

`LAST_INSERT_ID()` is connection-specific. Read it on the same database connection that performed the insert.

## 4.2 Insert multiple rows

```sql
INSERT INTO customers (first_name, last_name, email, phone)
VALUES
  ('Ravi', 'Das', 'ravi@example.test', '+91-9000000002'),
  ('Mina', 'Roy', 'mina@example.test', '+91-9000000003'),
  ('Kabir', 'Sen', 'kabir@example.test', NULL);
```

## 4.3 Insert products

```sql
INSERT INTO products (sku, name, description, unit_price, stock_quantity)
VALUES
  ('KB-001', 'Mechanical Keyboard', 'Compact wired keyboard', 2499.00, 20),
  ('MS-001', 'Wireless Mouse', 'Wireless optical mouse', 899.00, 35),
  ('MN-001', '24-inch Monitor', 'Full HD display', 8999.00, 10);
```

## 4.4 Insert related orders

Use IDs returned by your own queries. In this lab, find IDs rather than assuming they start at 1.

```sql
SELECT id, email FROM customers;
SELECT id, sku, unit_price FROM products;
```

Then create an order for the selected customer:

```sql
INSERT INTO orders (customer_id, order_number, status)
VALUES (1, 'ORD-2026-0001', 'pending');

SET @new_order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES
  (@new_order_id, 1, 1, 2499.00),
  (@new_order_id, 2, 2, 899.00);
```

User variables beginning with `@` exist only within the current connection/session. For application code, use parameters and retrieve generated IDs through the database driver.

---

# Stage 5 — Read data (SELECT)

## 5.1 Select columns explicitly

```sql
SELECT id, first_name, last_name, email
FROM customers;
```

Prefer explicit columns over `SELECT *` in application code. It reduces unnecessary data transfer and protects code from unexpected schema additions.

## 5.2 Column aliases

```sql
SELECT
    first_name AS first,
    last_name AS last,
    email AS contact_email
FROM customers;
```

## 5.3 DISTINCT

```sql
SELECT DISTINCT status
FROM orders;
```

`DISTINCT` removes duplicate result rows. It is not a replacement for understanding why duplicates appear in a join.

## 5.4 WHERE filters

```sql
SELECT *
FROM products
WHERE unit_price >= 1000
  AND is_active = TRUE;
```

Operators:

| Operator | Meaning |
|---|---|
| `=` | Equal |
| `<>` or `!=` | Not equal |
| `>` / `<` | Greater / less |
| `>=` / `<=` | Greater-or-equal / less-or-equal |
| `AND` | Both conditions true |
| `OR` | Either condition true |
| `NOT` | Negation |
| `BETWEEN` | Inclusive range |
| `IN` | Matches a list |
| `LIKE` | Pattern match |
| `IS NULL` | Null check |

Examples:

```sql
SELECT * FROM products WHERE unit_price BETWEEN 500 AND 3000;
SELECT * FROM orders WHERE status IN ('pending', 'processing');
SELECT * FROM customers WHERE email LIKE '%@example.test';
SELECT * FROM customers WHERE phone IS NULL;
```

`NULL` is not equal to zero or an empty string. Use `IS NULL` and `IS NOT NULL`, not `= NULL`.

## 5.5 Sorting and pagination

```sql
SELECT id, name, unit_price
FROM products
WHERE is_active = TRUE
ORDER BY unit_price DESC, name ASC
LIMIT 10 OFFSET 0;
```

- `ASC`: ascending (default).
- `DESC`: descending.
- `LIMIT`: maximum number of rows.
- `OFFSET`: number of rows to skip.

For large datasets, deep offsets can become expensive. Consider keyset pagination using the last seen indexed value.

## 5.6 Conditional output with CASE

```sql
SELECT
    name,
    stock_quantity,
    CASE
      WHEN stock_quantity = 0 THEN 'Out of stock'
      WHEN stock_quantity < 5 THEN 'Low stock'
      ELSE 'Available'
    END AS stock_status
FROM products;
```

---

# Stage 6 — Update and delete data

## 6.1 Update one row

```sql
UPDATE products
SET unit_price = 2599.00
WHERE sku = 'KB-001';
```

Always check the target rows before updating:

```sql
SELECT id, sku, unit_price
FROM products
WHERE sku = 'KB-001';
```

Then execute the update and verify the result.

## 6.2 Update multiple columns

```sql
UPDATE customers
SET phone = '+91-9000000099',
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'asha@example.test';
```

The `updated_at` column in our table also updates automatically when a row changes; explicitly setting it is shown here for learning, but is unnecessary with the declared `ON UPDATE` behavior.

## 6.3 Delete selected rows

```sql
DELETE FROM customers
WHERE email = 'kabir@example.test';
```

This can fail if another table references the customer through a foreign key. Decide whether the child data should be retained, reassigned, or deleted according to the business rules.

## 6.4 Dangerous statements

```sql
-- DANGEROUS: no WHERE means every row is updated.
UPDATE products SET unit_price = 0;

-- DANGEROUS: no WHERE means every row is deleted.
DELETE FROM products;

-- DANGEROUS: removes all rows quickly; does not behave like a filtered DELETE.
TRUNCATE TABLE order_items;
```

A safe developer checklist:

1. Run a `SELECT` with the exact `WHERE` condition.
2. Confirm the number and identity of matching rows.
3. Use a transaction for related DML when the table engine supports it.
4. Execute the change.
5. Verify the result.
6. Commit only when correct; otherwise roll back.

---

# Stage 7 — ALTER, DROP, and schema maintenance

## 7.1 Add a column

```sql
ALTER TABLE customers
ADD COLUMN company_name VARCHAR(160) NULL AFTER last_name;
```

## 7.2 Rename a column

```sql
ALTER TABLE customers
RENAME COLUMN company_name TO organization_name;
```

For a version or migration where `RENAME COLUMN` is unavailable, `CHANGE COLUMN` requires the full new column definition. Check your target MySQL version.

## 7.3 Change a column type

```sql
ALTER TABLE customers
MODIFY COLUMN phone VARCHAR(40) NULL;
```

Changing a type can rewrite data or fail if existing values do not fit. Test on a copy and back up important data first.

## 7.4 Add or drop an index

```sql
CREATE INDEX idx_products_name ON products (name);
DROP INDEX idx_products_name ON products;
```

## 7.5 Drop a column or table

```sql
-- Destructive: removes the column and its data.
ALTER TABLE customers DROP COLUMN organization_name;

-- Destructive: removes the table definition and its data.
DROP TABLE IF EXISTS temporary_import;
```

Schema changes are often not safely reversible by `ROLLBACK`; plan migrations and backups before running DDL.

---

# Stage 8 — Relationships and JOINs

Relational databases connect rows using keys. Our sample schema has:

- One customer → many orders.
- One order → many order items.
- One product → many order items.

## 8.1 INNER JOIN

Returns rows with a match on both sides:

```sql
SELECT
    o.order_number,
    c.first_name,
    c.last_name,
    o.status,
    o.ordered_at
FROM orders AS o
INNER JOIN customers AS c ON c.id = o.customer_id;
```

## 8.2 LEFT JOIN

Returns every customer, even customers without an order:

```sql
SELECT
    c.id,
    c.first_name,
    c.last_name,
    o.order_number
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
ORDER BY c.id;
```

## 8.3 Join order items to products

```sql
SELECT
    o.order_number,
    p.sku,
    p.name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
JOIN products AS p ON p.id = oi.product_id
ORDER BY o.ordered_at DESC;
```

## 8.4 Find customers with no orders

```sql
SELECT c.id, c.first_name, c.last_name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;
```

## 8.5 Avoid accidental duplicate multiplication

Joining two one-to-many relationships at once can multiply rows. Aggregate each child relationship at the correct grain or use a derived table/CTE before joining. Always ask: “What does one result row represent?”

---

# Stage 9 — Aggregates and reports

## 9.1 Aggregate functions

| Function | Purpose |
|---|---|
| `COUNT(*)` | Count rows |
| `COUNT(column)` | Count non-NULL values |
| `SUM(column)` | Sum values |
| `AVG(column)` | Average |
| `MIN(column)` | Minimum |
| `MAX(column)` | Maximum |

```sql
SELECT
    COUNT(*) AS product_count,
    MIN(unit_price) AS cheapest,
    MAX(unit_price) AS most_expensive,
    AVG(unit_price) AS average_price
FROM products;
```

## 9.2 GROUP BY

```sql
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status;
```

## 9.3 HAVING

`WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.

```sql
SELECT customer_id, COUNT(*) AS total_orders
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;
```

## 9.4 Revenue report

```sql
SELECT
    o.id,
    o.order_number,
    SUM(oi.quantity * oi.unit_price) AS order_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
GROUP BY o.id, o.order_number
ORDER BY order_total DESC;
```

This calculates item totals, not necessarily final invoice totals. Shipping, tax, discounts, refunds, and payment status need explicit business rules and schema fields.

---

# Stage 10 — Subqueries, CTEs, and window functions

## 10.1 Subquery

Find products priced above the average:

```sql
SELECT id, name, unit_price
FROM products
WHERE unit_price > (
    SELECT AVG(unit_price) FROM products
);
```

## 10.2 Common Table Expression (CTE)

A CTE names a query result for use by the statement that follows it.

```sql
WITH order_totals AS (
    SELECT
        order_id,
        SUM(quantity * unit_price) AS total
    FROM order_items
    GROUP BY order_id
)
SELECT o.order_number, ot.total
FROM orders AS o
JOIN order_totals AS ot ON ot.order_id = o.id
ORDER BY ot.total DESC;
```

## 10.3 Window function

Rank orders by value without collapsing individual rows:

```sql
WITH order_totals AS (
    SELECT
        o.id,
        o.customer_id,
        o.order_number,
        SUM(oi.quantity * oi.unit_price) AS total
    FROM orders AS o
    JOIN order_items AS oi ON oi.order_id = o.id
    GROUP BY o.id, o.customer_id, o.order_number
)
SELECT
    order_number,
    customer_id,
    total,
    RANK() OVER (ORDER BY total DESC) AS value_rank
FROM order_totals;
```

Window functions calculate across a related set of rows while keeping each result row. They are useful for ranking, running totals, and per-customer comparisons.

---

# Stage 11 — Constraints, indexes, and views

## 11.1 Constraints

- `PRIMARY KEY`: uniquely identifies each row and cannot be NULL.
- `FOREIGN KEY`: enforces a relationship to a referenced key.
- `UNIQUE`: prevents duplicate values in the constrained key.
- `NOT NULL`: requires a value.
- `DEFAULT`: supplies a value when one is omitted.
- `CHECK`: enforces a Boolean condition (supported and enforced in modern MySQL).

Constraints protect data even when writes come from multiple applications or scripts.

## 11.2 Index basics

An index can speed up reads, joins, and sorting when it matches query patterns. Indexes also consume storage and add work to inserts, updates, and deletes.

```sql
CREATE INDEX idx_orders_status_date
ON orders (status, ordered_at);
```

Composite index order matters. An index on `(status, ordered_at)` is generally useful for predicates beginning with `status`; it is not equivalent to an index on `(ordered_at, status)`.

Do not index every column. Start with real queries, then inspect the plan and measure.

## 11.3 EXPLAIN

```sql
EXPLAIN
SELECT id, order_number, ordered_at
FROM orders
WHERE customer_id = 1
ORDER BY ordered_at DESC;
```

Inspect which table access method and index the optimizer chooses, estimated rows, and extra operations. `EXPLAIN ANALYZE` executes the statement and reports actual timing/row information; use it carefully because it really runs the query.

## 11.4 Views

A view is a saved query that can simplify repeated reporting logic:

```sql
CREATE OR REPLACE VIEW order_summary AS
SELECT
    o.id AS order_id,
    o.order_number,
    o.status,
    o.ordered_at,
    c.id AS customer_id,
    c.email AS customer_email
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
```

Use it like a table:

```sql
SELECT * FROM order_summary WHERE status = 'pending';
```

A normal MySQL view does not store a separate copy of the result rows.

---

# Stage 12 — Transactions and reliable updates

Transactions group related changes so they succeed or fail together. Use InnoDB for transactional application tables.

## 12.1 Basic transaction

```sql
START TRANSACTION;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE id = 1 AND stock_quantity >= 1;

-- Check affected rows in your SQL client/application.
-- If exactly one row was changed and all related work succeeded:
COMMIT;

-- Otherwise:
-- ROLLBACK;
```

The example shows the pattern, but a production application must inspect the affected-row count and make the commit/rollback decision in application logic. Do not blindly commit if the stock update affected zero rows.

## 12.2 Transfer-like operation

A financial transfer needs validation, sufficient-balance checks, atomic updates, and a ledger/audit trail. Simplified illustration:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100.00
WHERE id = 10 AND balance >= 100.00;

-- Application checks that exactly one row was updated.
-- Only then:
UPDATE accounts
SET balance = balance + 100.00
WHERE id = 20;

-- Application verifies the second update and any ledger insert.
COMMIT;

-- If any validation or write fails, ROLLBACK.
```

This is a pattern illustration, not a complete banking implementation. Real systems need immutable transaction records, idempotency, concurrency control, authorization, limits, reconciliation, and careful decimal arithmetic.

## 12.3 Savepoints

```sql
START TRANSACTION;

UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 1;

SAVEPOINT after_stock_change;

-- Additional work...

ROLLBACK TO SAVEPOINT after_stock_change;
COMMIT;
```

A savepoint rolls back part of the current transaction, not the whole transaction.

## 12.4 Locking reads

For workflows that must coordinate concurrent writers, study `SELECT ... FOR UPDATE` within a transaction. It locks the selected rows according to InnoDB locking rules. Keep transactions short, access rows in a consistent order, and handle deadlocks by retrying the complete transaction safely.

---

# Stage 13 — Security and application development

## 13.1 Create a least-privilege application account

Run account-management statements as an administrator and replace the example password with a strong secret supplied securely:

```sql
CREATE USER 'shop_app'@'localhost' IDENTIFIED BY 'REPLACE_WITH_A_STRONG_SECRET';

GRANT SELECT, INSERT, UPDATE, DELETE
ON developer_lab.*
TO 'shop_app'@'localhost';
```

Do not use the MySQL `root` account from a web application. Do not grant `ALL PRIVILEGES` to an ordinary application account without a specific operational need.

## 13.2 SQL injection: never concatenate user input

**Unsafe pattern (do not use):**

```text
"SELECT * FROM users WHERE email = '" + userInput + "'"
```

Use prepared statements with bound parameters. Example using PHP PDO:

```php
<?php
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=developer_lab;charset=utf8mb4',
    $dbUser,
    $dbPassword,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

$stmt = $pdo->prepare(
    'SELECT id, first_name, last_name, email
     FROM customers
     WHERE email = :email'
);

$stmt->execute(['email' => $emailFromRequest]);
$customer = $stmt->fetch();
```

Prepared parameters bind values, not table or column names. For dynamic sorting, choose the column from a strict server-side allowlist.

## 13.3 Password storage

Do not store plaintext passwords or reversible passwords. Hash passwords in the application using a password-hashing API such as PHP `password_hash()` and verify with `password_verify()`. Database encryption is not a substitute for password hashing.

## 13.4 Laravel developer pattern

Laravel applications should normally use migrations, Eloquent, or the query builder rather than embedding schema changes in ad hoc production SQL.

Migration example:

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('sku', 60)->unique();
    $table->string('name', 160);
    $table->decimal('unit_price', 12, 2);
    $table->unsignedInteger('stock_quantity')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

Query builder example:

```php
$products = DB::table('products')
    ->where('is_active', true)
    ->where('unit_price', '>=', 1000)
    ->orderBy('name')
    ->paginate(20);
```

Transaction example:

```php
DB::transaction(function () use ($productId) {
    $product = DB::table('products')
        ->where('id', $productId)
        ->lockForUpdate()
        ->first();

    if (!$product || $product->stock_quantity < 1) {
        throw new RuntimeException('Insufficient stock.');
    }

    DB::table('products')
        ->where('id', $productId)
        ->decrement('stock_quantity');
});
```

Adapt this to the Laravel version and application architecture. Validate request data, authorize the operation, and keep business rules in an appropriate service/domain layer.

---

# Stage 14 — Backup, restore, and operations

## 14.1 Logical backup with mysqldump

Run from a terminal, not inside the SQL prompt:

```bash
mysqldump -u backup_user -p --single-transaction --routines --triggers developer_lab > developer_lab.sql
```

`--single-transaction` provides a consistent snapshot for transactional tables such as InnoDB. It does not make nontransactional tables consistent while they are changing.

## 14.2 Restore

```bash
mysql -u restore_user -p developer_lab < developer_lab.sql
```

Test restores regularly in a separate environment. A backup that has never been restored is not a verified recovery plan.

## 14.3 Production checklist

- Keep MySQL and the operating system patched.
- Use private networking/firewall rules; do not expose the database publicly without a deliberate secure design.
- Require encrypted connections where traffic crosses untrusted networks.
- Use separate accounts for application, migration, backup, and administration tasks.
- Store secrets outside source control.
- Back up on a defined schedule and test restores.
- Monitor disk space, connections, slow queries, replication (if used), and backup failures.
- Use migrations and review destructive schema changes.
- Log application events without logging passwords, tokens, or sensitive personal data.

---

# Stage 15 — Everyday MySQL developer handy sheet

## Database and table inspection

```sql
SHOW DATABASES;
USE database_name;
SHOW TABLES;
DESCRIBE table_name;
SHOW CREATE TABLE table_name;
SHOW INDEX FROM table_name;
```

## CRUD templates

```sql
-- CREATE
INSERT INTO table_name (column_a, column_b)
VALUES ('value_a', 'value_b');

-- READ
SELECT column_a, column_b
FROM table_name
WHERE id = 1;

-- UPDATE: always review the WHERE clause
UPDATE table_name
SET column_a = 'new_value'
WHERE id = 1;

-- DELETE: always review the WHERE clause
DELETE FROM table_name
WHERE id = 1;
```

## Query clause order

```sql
SELECT ...
FROM ...
JOIN ... ON ...
WHERE ...
GROUP BY ...
HAVING ...
ORDER BY ...
LIMIT ... OFFSET ...;
```

## Useful functions

| Purpose | Functions |
|---|---|
| Text | `CONCAT`, `LOWER`, `UPPER`, `TRIM`, `SUBSTRING`, `LENGTH`, `CHAR_LENGTH`, `REPLACE` |
| Numeric | `ROUND`, `CEIL`, `FLOOR`, `ABS`, `MOD` |
| Dates | `NOW`, `CURDATE`, `DATE`, `YEAR`, `MONTH`, `DATEDIFF`, `DATE_ADD` |
| Null handling | `COALESCE`, `IFNULL`, `NULLIF` |
| Conditional | `CASE`, `IF` |
| Aggregates | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` |
| JSON | `JSON_EXTRACT`, `JSON_OBJECT`, `JSON_ARRAY`, `JSON_SET` |

Examples:

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;

SELECT COALESCE(phone, 'No phone supplied') AS phone_display
FROM customers;

SELECT DATE_ADD(CURDATE(), INTERVAL 30 DAY) AS due_date;
```

## Common mistakes to avoid

1. Using `= NULL` instead of `IS NULL`.
2. Running `UPDATE` or `DELETE` without checking the `WHERE` clause.
3. Using `SELECT *` in high-traffic application queries.
4. Storing money in `FLOAT` or `DOUBLE`.
5. Storing phone numbers in numeric columns.
6. Forgetting a foreign key or choosing the wrong `ON DELETE` behavior.
7. Creating indexes without checking real query patterns.
8. Assuming `ORDER BY` is guaranteed when it is omitted.
9. Concatenating request input into SQL.
10. Treating a backup file as valid without testing restore.
11. Using MyISAM for a new transactional application table when InnoDB is the appropriate engine.
12. Assuming DDL can always be rolled back with a transaction.

---

# Stage 16 — Capstone: build a small order-management database

Use the tables from Stage 3 and complete this project without copying the answers blindly.

## Requirements

1. Add at least five customers.
2. Add at least ten products in three price ranges.
3. Create at least five orders across multiple customers.
4. Give each order two or more order items.
5. Write a query showing order number, customer name, date, status, and total.
6. Write a query showing each customer's total order count and lifetime order value.
7. Find products that have never been ordered.
8. Find products with stock below five.
9. Create a view for the order summary.
10. Add an index that supports a query you can explain.
11. Use a transaction to create an order and its items.
12. Back up the lab database and restore it under a different database name.

## Challenge queries

**A. Top five customers by order value**

```sql
SELECT
    c.id,
    c.first_name,
    c.last_name,
    SUM(oi.quantity * oi.unit_price) AS lifetime_value
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id
JOIN order_items AS oi ON oi.order_id = o.id
GROUP BY c.id, c.first_name, c.last_name
ORDER BY lifetime_value DESC
LIMIT 5;
```

**B. Products never ordered**

```sql
SELECT p.id, p.sku, p.name
FROM products AS p
LEFT JOIN order_items AS oi ON oi.product_id = p.id
WHERE oi.id IS NULL;
```

**C. Monthly order count**

```sql
SELECT
    DATE_FORMAT(ordered_at, '%Y-%m') AS order_month,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_FORMAT(ordered_at, '%Y-%m')
ORDER BY order_month;
```

**D. Rank products by revenue**

```sql
WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        SUM(oi.quantity * oi.unit_price) AS revenue
    FROM products AS p
    JOIN order_items AS oi ON oi.product_id = p.id
    GROUP BY p.id, p.name
)
SELECT
    name,
    revenue,
    DENSE_RANK() OVER (ORDER BY revenue DESC) AS revenue_rank
FROM product_revenue;
```

---

# Stage 17 — Exercises and self-check

## Beginner

1. Create a database named `practice_db`.
2. Create a `students` table with an auto-increment ID, name, email, and enrollment date.
3. Make email unique.
4. Insert five rows using one multi-row insert.
5. Select students alphabetically.
6. Update one student's email.
7. Delete one test row.

## Intermediate

8. Create `courses` and `student_courses` tables.
9. Add primary and foreign keys.
10. List students with their courses using joins.
11. Count students per course.
12. Find courses with zero students.
13. Use `HAVING` to show courses with more than three students.
14. Create a view for a course enrollment report.

## Advanced

15. Write a CTE that calculates monthly enrollments.
16. Rank courses by enrollment count using a window function.
17. Use `EXPLAIN` to inspect a filtered query.
18. Add an index justified by the query plan.
19. Wrap a multi-table operation in a transaction.
20. Create a least-privilege reporting user.
21. Back up the database and verify a restore.

## Self-check questions

- Why should money use `DECIMAL` rather than `FLOAT`?
- What is the difference between `WHERE` and `HAVING`?
- When should you use `LEFT JOIN` instead of `INNER JOIN`?
- Why do foreign keys matter?
- What does a composite index's column order affect?
- Why is a prepared statement safer than string concatenation?
- What does `ROLLBACK` do?
- Why must backups be restore-tested?

---

# Stage 18 — Corrections and modern notes from the original cheat sheet

The uploaded source is a useful beginner outline. These updates make it safer and more accurate for modern MySQL development:

| Original-style example or claim | Developer-ready guidance |
|---|---|
| `INT(11)` | Use `INT`; integer display width is not the storage size |
| `VARCHAR` maximum 255 | Modern `VARCHAR` limits depend on row and character-set limits; it is not generally capped at 255 |
| `DECIMAL` described as a double stored as string | `DECIMAL` is an exact fixed-point numeric type |
| `FLOAT`/`DOUBLE` for general numbers | Use approximate types only when approximation is acceptable; use `DECIMAL` for money |
| `ENGINE=MyISAM` | Prefer InnoDB for new transactional application tables unless a specific requirement says otherwise |
| `DEFAULT CHARSET=latin1` | Prefer `utf8mb4` for modern multilingual applications |
| `UPDATE ... WHERE id=...` without safety notes | Preview affected rows, use a transaction where appropriate, verify affected-row counts |
| `DROP` and `DELETE` shown as simple commands | Mark destructive commands clearly and test only in a disposable database |
| `id` included in every insert as `NULL` | Omit auto-increment IDs unless there is a deliberate reason to provide them |
| Double-quoted SQL strings | Use single quotes for portable, conventional SQL string literals |

The old sample used MyISAM and `latin1`; this handbook uses InnoDB and `utf8mb4` for the new practice schema. Existing production databases should not be converted blindly—plan and test migrations.

---

# Official documentation and further learning

- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [MySQL Tutorial](https://dev.mysql.com/doc/refman/8.4/en/tutorial.html)
- [Data Types](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)
- [CREATE TABLE](https://dev.mysql.com/doc/refman/8.4/en/create-table.html)
- [SELECT](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [JOIN syntax](https://dev.mysql.com/doc/refman/8.4/en/join.html)
- [Transactions](https://dev.mysql.com/doc/refman/8.4/en/commit.html)
- [InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html)
- [Indexes and optimization](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)
- [EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [Backup and recovery](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
- [MySQL security guidelines](https://dev.mysql.com/doc/refman/8.4/en/security-guidelines.html)
- [Laravel database documentation](https://laravel.com/docs/database)

---

## How to use this handbook

1. Install MySQL locally or use a disposable development database.
2. Work through Stages 0–3 and create the lab schema.
3. Type every query yourself; do not only copy and paste.
4. Continue through CRUD, joins, aggregates, transactions, and indexes.
5. Complete the capstone and exercises.
6. Keep Stage 15 open as your everyday SQL quick reference.
7. Before production use, verify syntax and behavior against the exact MySQL server version you run.

**End goal:** Be able to design a relational schema, write safe SQL, understand query plans, protect application data, and operate a MySQL-backed feature with confidence.
