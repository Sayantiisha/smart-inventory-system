
import sqlite3
import os

try:
    from .config import DB_PATH
except ImportError:
    from config import DB_PATH


def get_connection():
    try:
        connection = sqlite3.connect(DB_PATH)
        print("Connected Successfully")
        return connection

    except sqlite3.Error as e:
        print("Database Connection Error:", e)
        return None
