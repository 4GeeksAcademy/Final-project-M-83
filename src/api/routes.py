"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Islander
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
    new_islander = Islander(
        name = request_body.get('name'),
        age = request_body.get('age'),
        occupation = request_body.get('occupation'),
        hometown = request_body.get('hometown'),
        bombshell = request_body.get('bombshell', False)
    )

    db.session.add(new_islander)
    db.session.commit()

    response_body = {
        "msg": "New Islander has been added!",
        "islander": new_islander.serialize()
    }

    return jsonify(response_body), 201

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