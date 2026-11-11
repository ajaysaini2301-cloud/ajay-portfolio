
from flask import Flask
from flask_cors import CORS

from app.routes.contact_routes import contact_bp


def create_app():
    app = Flask(__name__)

    # Allow frontend requests
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "https://ajay-portfolio-pi-sandy.vercel.app"
                ]
            }
        }
    )

    # Register contact blueprint
    app.register_blueprint(contact_bp)
    @app.route("/api/health")
    def health():
        return {"status": "ok"}
    return app
