"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# ENDPOINTS
# USUARIO
# SIGNUP / REGISTRO
@api.route('/signup/user', methods=['POST'])
def signup():
    user = request.get_json()
    user_by_email = User.query.filter_by(email=user['email']).first()

    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if user_by_email:
        if user_by_email.email == user['email']:
            return jsonify('This email is already used'), 404
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_created = User(email=user['email'], password=user['password'], is_active=True)
    db.session.add(user_created)
    db.session.commit()
    return jsonify(user_created.serialize()), 200

# LOGIN / INICIO DE SESION
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route('/login/user', methods=['POST'])
def login():

    user = request.get_json()

    if not isinstance(user['email'], str) or len(user['email'].strip()) == 0:
         return({'error':'"email" must be a string'}), 400
    if not isinstance(user['password'], str) or len(user['password'].strip()) == 0:
         return({'error':'"password" must be a string'}), 400

    user_db = User.query.filter_by(email=user['email'], password=user['password']).first()
    if user_db is None:
        return jsonify("incorrect credentials"), 401
    
    access_token = create_access_token(identity=user['email'])
    print(access_token)
    return jsonify(access_token), 200

# PROTECTED ROUTE PROFILE / RUTA PROTEGIDA PERFIL
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200