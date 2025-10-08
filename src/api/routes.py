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

@app.route('/islanders', methods=['GET'])
def retreive_islanders():
    islanders = Islander.query.all()
    islanders_list = [item.serialize() for item in islanders]
    response_body = {
        "msg": "Here are all the islanders",
        "islanders": islanders_list
    }
    return jsonify(response_body), 200


@app.route('/islanders/<int:islander_id>', methods=['GET'])
def islander_info(islander_id):
    islander = db.session.get(Islander, islander_id)
    response_body = {
        "msg": "Here is this islander's information",
        "islander": islander.serialize()
    }
    return jsonify(response_body), 200