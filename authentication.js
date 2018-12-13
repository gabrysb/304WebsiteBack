'use strict'

const db = require('./database');

exports.loginUser = (conData, request, callback) => {

	//first check if basic authorization is present
	if (request.headers.authentication === undefined){
		//throw new Error('authorization header missing')
		let err = 400;
		console.log("-->" + err.message);
		callback(err);
		return;
	}
		
	var auth_header_user = Buffer.from(request.headers.authentication.split(' ')[1], 'base64').toString().split(":")[0];
	
	var auth_header_password = Buffer.from(request.headers.authentication.split(' ')[1], 'base64').toString().split(":")[1];

	//extract username and password from the auth
	if (auth_header_user === undefined || auth_header_password === undefined){
		//throw new Error('missing username and/or password')
		let err = {message:'missing username and/or password'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
	
	//connect to the database to check if there is such as username with such password
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db")
			callback(err);
			return;
		}	
		
		//perform the query, note we only select user id field
		//please note we have not uet encrypted the passwords
		data.query('SELECT id FROM users WHERE username="' + auth_header_user + '" AND password="' + auth_header_password + '"', function (err, result) {
			
			if(err){
				console.log("error in executing the query")
				callback(err);
				return;
			}
			
			//return control to the calling module
			//return null for error with data indicating successful login
			//return an error data with login false and null for data
			//the calling module will be responsible to handle the response and set response code
			if(result && result.length > 0)
				callback(null, {userId:result[0].id, login:true});
			else
				callback({login:false});
		});
	});
}