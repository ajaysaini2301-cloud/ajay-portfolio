
import re

from flask import Blueprint, request, jsonify
from app.services.contact_service import save_contact_message


# Create Blueprint
contact_bp = Blueprint("contact", __name__)


def validate_contact_data(data):
    """Validate contact form input."""

    required_fields = [
        "full_name",
        "email",
        "subject",
        "message"
    ]

    # Check required fields
    for field in required_fields:
        if field not in data or not isinstance(data[field], str):
            return f"{field} is required."

        if not data[field].strip():
            return f"{field} cannot be empty."

    full_name = data["full_name"].strip()
    email = data["email"].strip()
    subject = data["subject"].strip()
    message = data["message"].strip()

    # Name validation
    if len(full_name) > 100:
        return "Name cannot exceed 100 characters."

    if not re.fullmatch(r"[A-Za-z][A-Za-z .'-]*", full_name):
        return "Name contains invalid characters."

    # Email validation
    if len(email) > 255 or not re.fullmatch(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        email
    ):
        return "Please enter a valid email address."

    # Subject validation
    if len(subject) > 200:
        return "Subject cannot exceed 200 characters."

    # Message validation
    if len(message) < 10:
        return "Message must contain at least 10 characters."

    return None


@contact_bp.route("/api/contact", methods=["POST"])
def create_contact():

    try:
        # Receive JSON data
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({
                "success": False,
                "message": "Invalid JSON request."
            }), 400

        # Validate data
        validation_error = validate_contact_data(data)

        if validation_error:
            return jsonify({
                "success": False,
                "message": validation_error
            }), 400

        # Clean input data
        clean_data = {
            "full_name": data["full_name"].strip(),
            "email": data["email"].strip(),
            "subject": data["subject"].strip(),
            "message": data["message"].strip()
        }

        # Save message in PostgreSQL
        saved_message = save_contact_message(clean_data)

        return jsonify({
            "success": True,
            "message": "Your message has been sent successfully.",
            "data": saved_message
        }), 201

    except Exception as error:
        print(f"Contact API Error: {error}")

        return jsonify({
            "success": False,
            "message": "Something went wrong. Please try again later."
        }), 500
