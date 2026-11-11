"""Chapter 14 Lab: In-memory SQLite foreign keys, Row mapping, queries & transaction rollback."""

from __future__ import annotations

import sqlite3


def main() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")

    with conn:
        conn.executescript(
            """
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL
            );
            CREATE TABLE tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                done INTEGER NOT NULL DEFAULT 0
            );
            """
        )
        cur = conn.execute("INSERT INTO users (username) VALUES (?)", ("ada",))
        user_id = cur.lastrowid
        conn.executemany(
            "INSERT INTO tasks (user_id, title, done) VALUES (?, ?, ?)",
            [
                (user_id, "Learn SQLite transactions", 1),
                (user_id, "Write integration tests", 0),
            ],
        )

    # Demonstrate atomic rollback on failure inside transaction context
    try:
        with conn:
            conn.execute("INSERT INTO users (username) VALUES (?)", ("grace",))
            # Trigger FK failure cleanly so 'grace' is ALSO rolled back!
            conn.execute("INSERT INTO tasks (user_id, title) VALUES (?, ?)", (9999, "Orphan task"))
    except sqlite3.IntegrityError as exc:
        print("Transaction rolled back as expected:", exc)

    users = [dict(r) for r in conn.execute("SELECT id, username FROM users").fetchall()]
    open_tasks = [
        dict(r)
        for r in conn.execute(
            "SELECT t.id, u.username, t.title FROM tasks t JOIN users u ON u.id = t.user_id WHERE t.done = ?",
            (0,),
        ).fetchall()
    ]
    print("Committed users (grace rolled back):", users)
    print("Open tasks:", open_tasks)
    conn.close()


if __name__ == "__main__":
    main()
