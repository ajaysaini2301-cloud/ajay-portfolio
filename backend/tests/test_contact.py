
import sys
import os

# Add backend folder to Python path
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND_DIR)

from app.database.db_connection import get_db_connection


def test_database_connection():
    connection = None

    try:
        connection = get_db_connection()

        cursor = connection.cursor()
        cursor.execute("SELECT current_database();")

        database_name = cursor.fetchone()[0]

        print("Database connected successfully!")
        print("Database Name:", database_name)

        cursor.close()

    except Exception as error:
        print("Database connection failed:", error)

    finally:
        if connection:
            connection.close()
            print("Database connection closed.")


if __name__ == "__main__":
    test_database_connection()
