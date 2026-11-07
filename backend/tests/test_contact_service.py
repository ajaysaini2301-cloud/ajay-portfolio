
import sys
import os

# Add backend directory to Python path
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND_DIR)

from app.services.contact_service import save_contact_message


test_data = {
    "full_name": "Ajay Saini",
    "email": "ajay@example.com",
    "subject": "Service Test",
    "message": "Testing contact service from Python."
}

try:
    result = save_contact_message(test_data)

    print("\nContact message saved successfully!")
    print("Saved Data:", result)

except Exception as error:
    print("\nContact service test failed:", error)
