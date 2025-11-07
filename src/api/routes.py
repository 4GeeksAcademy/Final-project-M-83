"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Islander
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
   
    db.session.add(new_user)
    db.session.commit()
    response_body = {
        "message": "User created",
        "user": new_user.serialize()
    }
    
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


@api.route('/islanders', methods=['GET'])
def retreive_islanders():
    islanders = Islander.query.all()
    islanders_list = [item.serialize() for item in islanders]
    response_body = {
        "msg": "Here are all the islanders",
        "islanders": islanders_list
    }
    return jsonify(response_body), 200


@api.route('/islanders/<int:islander_id>', methods=['GET'])
def islander_info(islander_id):
    islander = db.session.get(Islander, islander_id)

    if not islander:
        return jsonify({"error": "Islander cannot be found"}), 404
    
    response_body = {
        "msg": "Here is this islander's information",
        "islander": islander.serialize()
    }
    return jsonify(response_body), 200

@api.route('/islanders', methods=['POST'])
def post_islander():
    request_body = request.get_json()
    

    islander = Islander.query.filter_by(name = request_body.get('name')).first()
    if islander:
        return jsonify({"msg": "islander already in DB"})
    new_islander = Islander(
        name = request_body.get('name'),
        age = request_body.get('age'),
        occupation = request_body.get('occupation'),
        hometown = request_body.get('hometown'),
        gender = request_body.get('gender'),
        bombshell = request_body.get('bombshell', False),
        photo_url = request_body.get("photo_url")
    )

    db.session.add(new_islander)
    db.session.commit()
    
    return jsonify({
        "msg": "islanders added successfully",
        "islanders": new_islander.serialize()}), 201

@api.route('/islanders/<int:islander_id>', methods=['PUT'])

def update_islander(islander_id):
    islander = db.session.get(Islander, islander_id)
    if not islander:
        return jsonify({"error": "Islander cannot be found"}), 404
    request_body = request.get_json()

    if "name" in request_body:
        islander.name = request_body["name"]
    if "age" in request_body:
        islander.age = request_body["age"]
    if "occupation" in request_body:
        islander.occupation = request_body["occupation"]
    if "hometown" in request_body:
        islander.hometown = request_body["hometown"]
    if "bombshell" in request_body:
        islander.bombshell = request_body["bombshell"]

    db.session.commit()

    response_body = {
        "msg": "Islander's information has been successfully updated!",
        "islander": islander.serialize()
    }

    return jsonify(response_body), 200

@api.route('/islanders/<int:islander_id>/vote', methods=['PUT'])
@jwt_required()
def vote_islander(islander_id):
    user_email = get_jwt_identity()
    islander = Islander.query.get(islander_id)
    if not islander:
        return jsonify({"msg": "Islander not found"}), 404
    islander.votes = (islander.votes or 0) + 1
    db.session.commit()
    return jsonify({"data": islander.serialize(), "message": f"Vote recorded by {user_email}"}), 200

@api.route('/user/favorites/<int:islander_id>', methods=['POST', 'DELETE'])
@jwt_required()
def handle_favorite_toggle(islander_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    
    if not user:
        return jsonify({"msg": "User not found."}), 404
    islander = Islander.query.get(islander_id)
    if not islander:
        return jsonify({"msg": "Islander not found."}), 404
    if request.method == 'POST':
        if islander in user.favorite_islanders:
            return jsonify({"msg": "Islander already favorited."}), 200
        user.favorite_islanders.append(islander)
        db.session.commit()
        return jsonify({"msg": f"Islander {islander_id} added to favorites."}), 201
    elif request.method == 'DELETE':
        # Check if the favorite exists before removing
        if islander not in user.favorite_islanders:
            return jsonify({"msg": "Islander not in favorites."}), 200
        user.favorite_islanders.remove(islander)
        db.session.commit()
        return jsonify({"msg": f"Islander {islander_id} removed from favorites."}), 204

    return jsonify({"msg": "Invalid method for this endpoint."}), 405

@api.route('/user/favorites/ids', methods=['GET'])
@jwt_required()
def get_favorite_ids():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "User not found."}), 404
    
    # Assuming user.favorites is the relationship list of Islander objects
    favorite_islander_ids = [islander.id for islander in user.favorite_islanders]
    
    return jsonify({
        "favorite_islander_ids": favorite_islander_ids
    }), 200


@api.route('/islanders/<int:islander_id>', methods=['DELETE'])
def remove_islander(islander_id):
    islander = db.session.get(Islander, islander_id)
    if not islander:
        return jsonify({"error": "Islander could not be found"}), 404

    db.session.delete(islander)
    db.session.commit()

    response_body = {
        "msg": "Islander has been voted off!"
    }

    return jsonify(response_body)

@api.route("/leaderboard", methods=["GET"])
def leaderboard():
    gender = request.args.get("gender")  # "Male" | "Female" | None
    limit  = int(request.args.get("limit", 20))

    q = Islander.query
    if gender in ("Male", "Female"):
        q = q.filter_by(gender=gender)

    islanders = (
        q.order_by(Islander.votes.desc(), Islander.name.asc())
         .limit(limit)
         .all()
    )
    return jsonify({"leaderboard": [i.serialize() for i in islanders]}), 200
