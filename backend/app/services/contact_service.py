
from app.database.db_connection import get_db_connection


def save_contact_message(data):
    """
    Save contact form message into PostgreSQL.
    """

    connection = None
    cursor = None

    try:
        # Step 1: Database connection
        connection = get_db_connection()

        # Step 2: Create cursor
        cursor = connection.cursor()

        # Step 3: SQL INSERT query
        query = """
            INSERT INTO contact_messages
            (full_name, email, subject, message)
            VALUES (%s, %s, %s, %s)
            RETURNING id, full_name, email, subject, status, created_at;
        """

        values = (
            data["full_name"],
            data["email"],
            data["subject"],
            data["message"]
        )

        # Step 4: Execute query
        cursor.execute(query, values)

        # Step 5: Get inserted record
        saved_message = cursor.fetchone()

        # Step 6: Commit transaction
        connection.commit()

        # Step 7: Return saved data
        return {
            "id": saved_message[0],
            "full_name": saved_message[1],
            "email": saved_message[2],
            "subject": saved_message[3],
            "status": saved_message[4],
            "created_at": saved_message[5].isoformat()
        }

    except Exception:
        if connection:
            connection.rollback()
        raise

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()
