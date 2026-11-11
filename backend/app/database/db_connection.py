import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from backend/.env
BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)

load_dotenv(os.path.join(BASE_DIR, ".env"))


def get_db_connection():
    """
    Create and return PostgreSQL database connection.
    Supports Neon Cloud and Local PostgreSQL.
    """
    try:
        database_url = os.getenv("DATABASE_URL")

        if database_url:
            # Neon Cloud Database
            connection = psycopg2.connect(database_url, connect_timeout=10)
        else:
            # Local PostgreSQL Database
            connection = psycopg2.connect(
                host=os.getenv("DB_HOST"),
                port=os.getenv("DB_PORT"),
                database=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD")
            )

        return connection

    except psycopg2.Error as error:
        print(f"Database connection error: {error}")
        raise