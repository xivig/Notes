# MySQL Developer Handbook & Everyday SQL Cheat Sheet

A practical, modern reference for designing schemas, writing safe SQL, debugging queries, and integrating MySQL into applications.

**Target baseline:** MySQL 8.4 LTS. Most examples also work on MySQL 8.0; confirm version-specific syntax on the server you deploy to.

> **Safety rule:** Practise in a disposable development database. `DROP`, `TRUNCATE`, and unfiltered `UPDATE`/`DELETE` can permanently destroy data.

### Companion Resources

* 📘 [**Comprehensive Learning Handbook (`README.md`)**](README.md) — 12-stage sequential tutorial from first connection to production architecture.
* 🧪 [**Interactive Practice Lab (`mysql-developer-lab.sql`)**](mysql-developer-lab.sql) — Ready-to-run SQL schema and test dataset.
  ```bash
  mysql -h 127.0.0.1 -u root -p < mysql-developer-lab.sql
  ```

---

## Contents

1. [Connect and inspect](#1-connect-and-inspect)
2. [SQL command groups](#2-sql-command-groups)
3. [Data types](#3-data-types)
4. [Create a database and tables](#4-create-a-database-and-tables)
5. [CRUD operations](#5-crud-operations)
6. [Filtering, sorting and pagination](#6-filtering-sorting-and-pagination)
7. [Joins and relationships](#7-joins-and-relationships)
8. [Aggregates and reporting](#8-aggregates-and-reporting)
9. [Subqueries, CTEs and window functions](#9-subqueries-ctes-and-window-functions)
10. [ALTER and schema changes](#10-alter-and-schema-changes)
11. [Indexes and query plans](#11-indexes-and-query-plans)
12. [Transactions and concurrency](#12-transactions-and-concurrency)
13. [Security and application code](#13-security-and-application-code)
14. [Backup and restore](#14-backup-and-restore)
15. [Daily developer quick reference](#15-daily-developer-quick-reference)
16. [Common mistakes and practice tasks](#16-common-mistakes-and-practice-tasks)

---

## 1. Connect and inspect

Terminal connection:

```bash
mysql -h 127.0.0.1 -P 3306 -u your_user -p
```

The client prompts for the password. Avoid putting credentials directly in shell commands, source files, or shell history.

```sql
SELECT VERSION();
SELECT CURRENT_USER();
SELECT DATABASE();
SELECT NOW();

SHOW DATABASES;
```

Useful MySQL client commands:

```text
STATUS
SOURCE /path/to/script.sql
EXIT
```

`STATUS`, `SOURCE`, and `EXIT` are interactive-client commands, not portable SQL statements.

## 2. SQL command groups

| Group | Purpose | Statements |
|---|---|---|
| DDL | Define schema objects | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| DML | Change rows | `INSERT`, `UPDATE`, `DELETE`, `REPLACE` |
| DQL | Query rows | `SELECT` |
| DCL | Manage permissions | `GRANT`, `REVOKE` |
| TCL | Manage transactions | `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

Some references classify `SELECT` under DML. The functional distinction matters more than the label.

## 3. Data types

### 3.1 Integer types

| Type | Signed range |
|---|---:|
| `TINYINT` | -128 to 127 |
| `SMALLINT` | -32,768 to 32,767 |
| `MEDIUMINT` | -8,388,608 to 8,388,607 |
| `INT` | -2,147,483,648 to 2,147,483,647 |
| `BIGINT` | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |

Use `UNSIGNED` when negative values are impossible and the larger non-negative range is useful.

```sql
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
```

Do not use legacy display-width declarations such as `INT(11)` to indicate storage size. Integer display width is not the numeric range and is deprecated/removed in modern MySQL behavior.

### 3.2 Numeric types

| Type | Choose it for |
|---|---|
| `DECIMAL(p,s)` | Exact values: prices, balances, tax rates |
| `FLOAT` | Approximate scientific/measurement values |
| `DOUBLE` | Approximate floating-point values with more precision than `FLOAT` |

For financial values:

```sql
price DECIMAL(12,2) NOT NULL
```

`DECIMAL` is an exact fixed-point type; it is not a `DOUBLE` stored as a string.

### 3.3 Text and binary types

| Type | Typical use |
|---|---|
| `CHAR(n)` | Fixed-length codes |
| `VARCHAR(n)` | Names, email addresses, labels |
| `TINYTEXT`, `TEXT` | Longer text |
| `MEDIUMTEXT`, `LONGTEXT` | Very large text |
| `BINARY`, `VARBINARY` | Binary values |
| `BLOB`, `MEDIUMBLOB`, `LONGBLOB` | Binary objects |

`VARCHAR` is not capped at 255 characters in modern MySQL. Its maximum depends on row-size, character-set and other limits. Text/BLOB limits are measured in bytes, not necessarily characters.

Prefer `utf8mb4` for modern multilingual applications.

### 3.4 Date and time

| Type | Meaning |
|---|---|
| `DATE` | Calendar date |
| `TIME` | Time or duration |
| `DATETIME` | Date/time without automatic timezone conversion |
| `TIMESTAMP` | Date/time with session-time-zone conversion behavior |
| `YEAR` | Year value |

```sql
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
```

Choose `DATETIME` or `TIMESTAMP` based on timezone and range requirements. A common application convention is to store moments consistently in UTC and convert at the application boundary.

### 3.5 Boolean, JSON and enumerations

```sql
is_active BOOLEAN NOT NULL DEFAULT TRUE,
metadata JSON NULL,
status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft'
```

- `BOOLEAN` is an alias for `TINYINT(1)`.
- `JSON` validates JSON documents and supports JSON functions.
- `ENUM` is useful for a small, stable set of values. If values change frequently or need metadata, use a lookup table.
- For multi-valued relationships, prefer a junction table over a `SET` column in most relational designs.

## 4. Create a database and tables

### 4.1 Create and select a database

```sql
CREATE DATABASE IF NOT EXISTS developer_lab
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE developer_lab;
SELECT DATABASE();
```

**Destructive reset — development only:**

```sql
-- WARNING: permanently deletes the database and all its tables/data.
-- Confirm the database name before running.
DROP DATABASE IF EXISTS developer_lab;
```

### 4.2 Create a table

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

### 4.3 Create a related products table

```sql
CREATE TABLE products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(60) NOT NULL,
    name VARCHAR(160) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    CONSTRAINT uq_products_sku UNIQUE (sku),
    CONSTRAINT chk_products_price CHECK (unit_price >= 0)
) ENGINE=InnoDB;
```

### 4.4 Create orders and order items

```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    customer_id BIGINT UNSIGNED NOT NULL,
    order_number VARCHAR(40) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    ordered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_orders_number UNIQUE (order_number),
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
    CONSTRAINT fk_items_order
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_items_product
      FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT chk_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_items_price CHECK (unit_price >= 0),
    INDEX idx_items_product (product_id)
) ENGINE=InnoDB;
```

**Design note:** `order_items.unit_price` stores the price agreed at purchase time. The current product price may change later, but historical orders should not silently change.

### 4.5 Inspect schema objects

```sql
SHOW TABLES;
DESCRIBE customers;
SHOW CREATE TABLE orders;
SHOW INDEX FROM order_items;
```

Use `SHOW CREATE TABLE` when you need the full definition, constraints and indexes.

## 5. CRUD operations

### 5.1 INSERT one row

```sql
INSERT INTO customers (first_name, last_name, email, phone)
VALUES ('Asha', 'Sen', 'asha@example.test', '+91-9000000001');

SELECT LAST_INSERT_ID();
```

Omit auto-increment IDs unless you deliberately need to provide them.

### 5.2 INSERT multiple rows

```sql
INSERT INTO customers (first_name, last_name, email, phone)
VALUES
  ('Ravi', 'Das', 'ravi@example.test', '+91-9000000002'),
  ('Mina', 'Roy', 'mina@example.test', '+91-9000000003'),
  ('Kabir', 'Sen', 'kabir@example.test', NULL);
```

### 5.3 SELECT rows

```sql
SELECT id, first_name, last_name, email
FROM customers;
```

Prefer explicit columns over `SELECT *` in application code.

### 5.4 UPDATE rows

Preview first:

```sql
SELECT id, email
FROM customers
WHERE id = 1;
```

Then update:

```sql
UPDATE customers
SET email = 'asha.new@example.test'
WHERE id = 1;
```

### 5.5 DELETE rows

Preview first:

```sql
SELECT id, email
FROM customers
WHERE id = 3;
```

Then delete:

```sql
DELETE FROM customers
WHERE id = 3;
```

A foreign key may prevent deletion when related records exist. Choose the correct retention or cascade policy; do not disable foreign-key checks as a routine workaround.

### 5.6 Never forget the WHERE clause

```sql
-- DANGEROUS: changes every row.
UPDATE products SET unit_price = 0;

-- DANGEROUS: deletes every row.
DELETE FROM products;

-- DANGEROUS: removes every row from the table.
TRUNCATE TABLE order_items;
```

Before a destructive statement: preview the exact rows, confirm the environment, use a transaction where appropriate, check affected-row counts, and verify the result.

## 6. Filtering, sorting and pagination

### 6.1 Comparison and logical operators

| Operator | Meaning |
|---|---|
| `=`, `<>`, `!=` | Equal / not equal |
| `>`, `<`, `>=`, `<=` | Comparisons |
| `AND`, `OR`, `NOT` | Logical conditions |
| `BETWEEN` | Inclusive range |
| `IN` | Matches a list |
| `LIKE` | Pattern matching |
| `IS NULL` | NULL check |

```sql
SELECT id, name, unit_price
FROM products
WHERE unit_price >= 500
  AND is_active = TRUE;

SELECT * FROM products WHERE unit_price BETWEEN 500 AND 3000;
SELECT * FROM orders WHERE status IN ('pending', 'processing');
SELECT * FROM customers WHERE email LIKE '%@example.test';
SELECT * FROM customers WHERE phone IS NULL;
```

`NULL` is not equal to zero, an empty string, or another `NULL`. Use `IS NULL` / `IS NOT NULL`.

### 6.2 Sorting and pagination

```sql
SELECT id, name, unit_price
FROM products
WHERE is_active = TRUE
ORDER BY unit_price DESC, name ASC
LIMIT 20 OFFSET 0;
```

Always specify `ORDER BY` when result order matters. Large offsets can be expensive; consider keyset pagination for deep pages.

### 6.3 CASE expressions

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

## 7. Joins and relationships

### 7.1 INNER JOIN

```sql
SELECT o.order_number, c.first_name, c.last_name, o.status
FROM orders AS o
INNER JOIN customers AS c ON c.id = o.customer_id;
```

Returns rows with a match on both sides.

### 7.2 LEFT JOIN

```sql
SELECT c.id, c.first_name, c.last_name, o.order_number
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

Returns every customer, including customers with no order.

### 7.3 Multi-table report

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

### 7.4 Find customers with no orders

```sql
SELECT c.id, c.first_name, c.last_name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;
```

**Join debugging tip:** Ask what one output row represents. Joining multiple one-to-many relationships can multiply rows. Aggregate each relationship at the correct level before joining when needed.

## 8. Aggregates and reporting

| Function | Purpose |
|---|---|
| `COUNT(*)` | Count rows |
| `COUNT(column)` | Count non-NULL values |
| `SUM(column)` | Sum |
| `AVG(column)` | Average |
| `MIN(column)` / `MAX(column)` | Minimum / maximum |

```sql
SELECT COUNT(*) AS product_count,
       MIN(unit_price) AS cheapest,
       MAX(unit_price) AS most_expensive,
       AVG(unit_price) AS average_price
FROM products;
```

### GROUP BY and HAVING

```sql
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status;

SELECT customer_id, COUNT(*) AS total_orders
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;
```

`WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.

### Order totals

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

This is an item subtotal. Tax, shipping, discounts, refunds and payment state need explicit business rules.

## 9. Subqueries, CTEs and window functions

### 9.1 Subquery

```sql
SELECT id, name, unit_price
FROM products
WHERE unit_price > (SELECT AVG(unit_price) FROM products);
```

### 9.2 Common Table Expression (CTE)

```sql
WITH order_totals AS (
    SELECT order_id, SUM(quantity * unit_price) AS total
    FROM order_items
    GROUP BY order_id
)
SELECT o.order_number, ot.total
FROM orders AS o
JOIN order_totals AS ot ON ot.order_id = o.id
ORDER BY ot.total DESC;
```

### 9.3 Window function

```sql
WITH order_totals AS (
    SELECT o.id, o.order_number,
           SUM(oi.quantity * oi.unit_price) AS total
    FROM orders AS o
    JOIN order_items AS oi ON oi.order_id = o.id
    GROUP BY o.id, o.order_number
)
SELECT order_number, total,
       RANK() OVER (ORDER BY total DESC) AS value_rank
FROM order_totals;
```

Window functions calculate across related rows without collapsing the result to one row per group.

## 10. ALTER and schema changes

```sql
-- Add a nullable column
ALTER TABLE customers
ADD COLUMN company_name VARCHAR(160) NULL;

-- Rename a column (modern MySQL)
ALTER TABLE customers
RENAME COLUMN company_name TO organization_name;

-- Change a column definition
ALTER TABLE customers
MODIFY COLUMN phone VARCHAR(40) NULL;

-- Add an index
CREATE INDEX idx_products_name ON products(name);

-- Drop an index
DROP INDEX idx_products_name ON products;
```

Destructive schema examples:

```sql
-- WARNING: permanently removes the column and its data.
ALTER TABLE customers DROP COLUMN organization_name;

-- WARNING: permanently removes the table and its data.
DROP TABLE IF EXISTS temporary_import;
```

DDL operations may implicitly commit and are not generally undone with `ROLLBACK`. Use reviewed migrations, backups and a staging test for production schema changes.

## 11. Indexes and query plans

Indexes can speed up filtering, joins and sorting, but they consume storage and add write overhead.

```sql
CREATE INDEX idx_orders_status_date
ON orders (status, ordered_at);

EXPLAIN
SELECT id, order_number, ordered_at
FROM orders
WHERE status = 'pending'
ORDER BY ordered_at DESC;
```

Composite index column order matters. An index on `(status, ordered_at)` is not equivalent to `(ordered_at, status)`. Base indexes on real query patterns, then measure.

`EXPLAIN ANALYZE` executes the query and reports actual execution information. Use it carefully, especially for expensive statements.

## 12. Transactions and concurrency

Use InnoDB for normal transactional application tables.

```sql
START TRANSACTION;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE id = 1 AND stock_quantity >= 1;

-- Application/client must check that exactly one row was updated.
-- Commit only if the stock change and all related writes succeeded.
COMMIT;

-- Otherwise, issue ROLLBACK instead of COMMIT.
```

For concurrent workflows, study `SELECT ... FOR UPDATE` inside a transaction. Keep transactions short, access rows in a consistent order, and implement safe deadlock retries in the application.

## 13. Security and application code

### 13.1 Least-privilege account

Run as an administrator and replace the sample secret securely:

```sql
CREATE USER 'shop_app'@'localhost'
IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_SECRET';

GRANT SELECT, INSERT, UPDATE, DELETE
ON developer_lab.*
TO 'shop_app'@'localhost';
```

Do not use `root` from an application. Do not grant global privileges to an ordinary application account.

### 13.2 Prevent SQL injection with prepared statements

Never build SQL by concatenating request input.

PHP PDO example:

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

Prepared parameters bind values, not table or column names. Use a strict server-side allowlist for dynamic sort columns.

### 13.3 Passwords

Never store plaintext passwords or reversibly encrypted passwords. Hash passwords in the application with a dedicated password-hashing API such as PHP `password_hash()` and verify with `password_verify()`.

### 13.4 Laravel query builder

```php
$products = DB::table('products')
    ->where('is_active', true)
    ->where('unit_price', '>=', 1000)
    ->orderBy('name')
    ->paginate(20);
```

Use Laravel migrations for schema evolution and `DB::transaction()` for multi-step writes. Validate inputs and authorize actions before writing.

## 14. Backup and restore

Run these in a terminal, not inside the SQL prompt.

```bash
mysqldump -u backup_user -p --single-transaction --routines --triggers developer_lab > developer_lab.sql
```

Restore into a database you have created and verified:

```bash
mysql -u restore_user -p developer_lab < developer_lab.sql
```

`--single-transaction` is appropriate for a consistent snapshot of transactional tables such as InnoDB. Test restores regularly; a backup that has never been restored is not a verified recovery plan.

## 15. Daily developer quick reference

### Inspect

```sql
SHOW DATABASES;
USE database_name;
SHOW TABLES;
DESCRIBE table_name;
SHOW CREATE TABLE table_name;
SHOW INDEX FROM table_name;
```

### CRUD template

```sql
-- CREATE
INSERT INTO table_name (column_a, column_b)
VALUES ('value_a', 'value_b');

-- READ
SELECT column_a, column_b
FROM table_name
WHERE id = 1;

-- UPDATE: inspect the WHERE clause first
UPDATE table_name
SET column_a = 'new_value'
WHERE id = 1;

-- DELETE: inspect the WHERE clause first
DELETE FROM table_name
WHERE id = 1;
```

### Query clause order

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

### Useful functions

| Category | Functions |
|---|---|
| Text | `CONCAT`, `LOWER`, `UPPER`, `TRIM`, `SUBSTRING`, `CHAR_LENGTH`, `REPLACE` |
| Numeric | `ROUND`, `CEIL`, `FLOOR`, `ABS`, `MOD` |
| Date | `NOW`, `CURDATE`, `DATE`, `YEAR`, `MONTH`, `DATEDIFF`, `DATE_ADD` |
| NULL | `COALESCE`, `IFNULL`, `NULLIF` |
| Conditional | `CASE`, `IF` |
| Aggregate | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` |
| JSON | `JSON_EXTRACT`, `JSON_OBJECT`, `JSON_ARRAY`, `JSON_SET` |

Examples:

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;

SELECT COALESCE(phone, 'Not supplied') AS phone_display
FROM customers;

SELECT DATE_ADD(CURDATE(), INTERVAL 30 DAY) AS due_date;
```

## 16. Common mistakes and practice tasks

### Avoid these mistakes

1. Using `= NULL` instead of `IS NULL`.
2. Running `UPDATE` or `DELETE` without checking the `WHERE` condition.
3. Using `FLOAT` for money.
4. Storing phone numbers in numeric columns.
5. Using `SELECT *` in every application query.
6. Forgetting foreign keys and delete behavior.
7. Adding indexes without understanding query patterns.
8. Assuming rows have a stable order without `ORDER BY`.
9. Concatenating user input into SQL.
10. Assuming DDL can always be rolled back.
11. Treating an untested backup as a recovery plan.

### Practice tasks

1. Create a `students` table with a unique email.
2. Insert five students with one multi-row `INSERT`.
3. Create `courses` and a `student_courses` junction table.
4. List students and their courses with joins.
5. Count enrollments per course with `GROUP BY`.
6. Find courses with no students using `LEFT JOIN`.
7. Create a view for an enrollment report.
8. Use `EXPLAIN` on a filtered query and justify an index.
9. Wrap a multi-table write in a transaction.
10. Create a least-privilege reporting user and test a backup restore.

---

## Corrections made to the legacy cheat sheet

| Legacy pattern | Modern guidance |
|---|---|
| `INT(11)` | Use `INT`; display width is not storage size |
| `VARCHAR` max 255 | Modern limit depends on row size and character set |
| `DECIMAL` is a `DOUBLE` stored as text | `DECIMAL` is exact fixed-point numeric |
| `ENGINE=MyISAM` | Prefer InnoDB for transactional application tables |
| `DEFAULT CHARSET=latin1` | Prefer `utf8mb4` for multilingual applications |
| `brew cask`-style outdated commands (in companion script) | Use current Homebrew `install --cask` syntax |
| Explicit `NULL` for auto-increment IDs | Omit the ID column when it should auto-generate |
| Double-quoted string literals | Use single quotes for conventional SQL strings |
| Unqualified destructive commands | Preview rows and clearly mark destructive operations |

## Official documentation

- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [MySQL data types](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)
- [CREATE TABLE](https://dev.mysql.com/doc/refman/8.4/en/create-table.html)
- [SELECT](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [JOIN syntax](https://dev.mysql.com/doc/refman/8.4/en/join.html)
- [Transactions](https://dev.mysql.com/doc/refman/8.4/en/commit.html)
- [Indexes and optimization](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)
- [EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [Backup and recovery](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
- [Homebrew](https://brew.sh/)
- [Oh My Zsh](https://ohmyz.sh/)

## Suggested workflow

1. Install MySQL locally or use a disposable development database.
2. Work through schema creation and CRUD.
3. Practise joins, aggregates and transactions.
4. Inspect query plans before adding indexes.
5. Use prepared statements in every application.
6. Test backup and restore before trusting the setup.
