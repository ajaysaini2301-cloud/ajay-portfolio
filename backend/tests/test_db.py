import sys
import os

# Add backend folder to Python path
sys.path.insert(
    0,
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)

from app.database.db_connection import get_db_connection

try:
    connection = get_db_connection()

    cursor = connection.cursor()
    cursor.execute("SELECT version();")

    result = cursor.fetchone()

    print("Database Connected Successfully!")
    print(result[0])

    cursor.close()
    connection.close()

except Exception as error:
    print("Database Connection Failed!")
    print(error)