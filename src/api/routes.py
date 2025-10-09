"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token , get_jwt_identity , jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign_up', methods=['POST'])
def handle_sign_up():
    body = request.json
    new_email = body ['email']
    new_password = body ['password']
    new_username = body ['username']
    new_phonenumber  = body.get('phonenumber')
    new_profile_image = body.get ('profile_image')
    user_exists = User.query.filter_by(email=new_email).first()
    if user_exists:
        return jsonify({"msg": "Email already exists."}), 409 
    new_user = User (
        email = new_email, 
        password = generate_password_hash(new_password),
        username = new_username,
        phonenumber= new_phonenumber,
        profile_image = new_profile_image
        )
    response_body = {
        "message": "User created",
        "user": new_user.serialize()
    }
    db.session.add(new_user)
    db.session.commit()

    return jsonify(response_body), 201

@api.route('/log_in', methods=['POST'])
def handle_log_in():
    body = request.json
    new_email = body ['email']
    new_password = body ['password']
    main_user = User.query.filter_by(email = new_email).first()
    if not main_user:
        return jsonify("No matching email!"), 401
    
    if not check_password_hash(main_user.password ,new_password):
        return jsonify("Invalid password, please try again"), 401
    response_body = {
        "message": "User created",
        "user": main_user.serialize()
    }
    token = create_access_token(identity = new_email)
    response_body ={
        "message":"Welcome user",
        "user": main_user.serialize(),
        "token": token
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def handle_a_user():
    user_email = get_jwt_identity()
    print("user email HERE!",user_email)
    main_user = User.query.filter_by(email = user_email).first()
    resp = {
        "data": main_user.serialize(),
        "message": "User found"
    }
    return jsonify(resp),200 

@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    body = request.json
    user = User.query.get(id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404

    new_username = body.get('username')
    new_phonenumber = body.get('phonenumber')
    new_profile_image = body.get('profile_image')
    new_password = body.get('password') 

    if new_username:
        user.username = new_username
    if new_phonenumber:
        user.phonenumber = new_phonenumber
    if new_profile_image:
        user.profile_image = new_profile_image
    if new_password:
        user.password = generate_password_hash(new_password)

    db.session.commit()

    return jsonify({
        "msg": "User updated",
        "user": user.serialize()
    }), 200

@api.route('/user/<int:id>',methods=['DELETE'])
def delete_user(id):
    user= User.query.get(id)

    if not user:
        return jsonify({"msg": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User Deleted"}), 204

