#! /usr/bin/env python3

import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies, jwt_required, JWTManager
import requests
from flask_mysqldb import MySQL,MySQLdb
import config


api = Flask(__name__)
api.config["JWT_SECRET_KEY"] = "askasdkf!!lskdfj"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)
jwt = JWTManager(api)

api.config['MYSQL_HOST'] = config.MYSQL_HOST
api.config['MYSQL_USER'] = config.MYSQL_USER
api.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
api.config['MYSQL_DB'] = config.MYSQL_DB
api.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(api)


def refresh_expiring_jwts(response):
	try:
		exp_timestamp = get_jwt()["exp"]
		now = datetime.now(timezone.utc)
		target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
		if target_timestamp > exp_timestamp:
			access_token = create_access_token(identity=get_jwt_identity())
			set_access_cookies(response, access_token)
		return response
	except (RuntimeError, KeyError):
		# Case where there is not a valid JWT. Just return the original response
		return response

@api.route('/profile')
@jwt_required()
def my_profile():
	response_body = {
		"name": "Nagato",
		"about" :"Hello! I'm a full stack developer that loves python and javascript"
	}

	return jsonify(response_body)

@api.route('/token', methods=["POST"])
def create_token():
	f = open('trackign.txt','w')
	f.write('first line')
	f.write(str(request))
	f.write(str(request.method))
	f.write(str(request.json))
	email = request.json.get("email", None)
	password = request.json.get("password", None)
	if email != "test" or password != "test":
		return {"msg": "Wrong email or password"}, 401
	f.write('made it here')
	access_token = create_access_token(identity=email)
	response = {"access_token":access_token}
	return response

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/userdets', methods=["POST"])
def userdets():	
	f = open('userdets.txt','w')
	cursor = mysql.connection.cursor()
	f.write(str(request.json))
	f.write(str(request.json.get('id',None)))
	tuple2 = (request.json.get("id", None),2,2)
	f.write(str(tuple2))
	
	cursor.execute('''SELECT p.person_id,FirstName,LastName from persons p 
	  where p.person_id=%s''',(request.json.get("id", None),))

	results = cursor.fetchall()
	returnable = dict(results[0])
	
	cursor.execute('''SELECT * from phones where person_id=%s''',(request.json.get("id", None),))
	f.write(str(dict(results[0])))
	resultsph = cursor.fetchall()

	if len(resultsph) >= 1:
		f.write(str((list(resultsph))))
		returnable["phones"] = list(resultsph)
	else:
		f.write(str('NoPhones'))
		returnable["phones"] = list(resultsph)

	
	cursor.execute('''SELECT * from household_person hp join households hh on  hp.household_id=hh.household_id where hp.person_id = %s''',(request.json.get("id", None),))
	f.write('HOUSEHOLDPERSON\n')
	resultshh = cursor.fetchall()
	f.write(str(len(resultshh)))
	if len(resultshh) == 1:
		returnable["households"] = dict(resultshh[0])
	else:
		returnable["households"] = {}

	return jsonify(returnable)

@api.route('/userlist', methods=["GET"])
def userlist():	
	cursor = mysql.connection.cursor()
	cursor.execute('''SELECT * from persons''')
	results = cursor.fetchall()
	return jsonify(results)

if __name__ == '__main__':
   api.run('127.0.0.1',5000,debug = True)