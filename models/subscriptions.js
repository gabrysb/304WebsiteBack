'use strict'

var db = require('../database');

//this function is responsible for adding a new user
exports.add = function(conData, subData, callback){
	
	//TODO: server validation

	//if pass validation connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//TODO server validation


		//perform the query
		conn.query('INSERT INTO subscriptions SET ?', subData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};

exports.getAll = function(conData, subData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM subscriptions', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
		
	});
};

exports.getById = function(conData, subData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('SELECT * FROM subscriptions WHERE id = ' + subData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});			
		
	});
};

exports.deleteById = function(conData, subData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('DELETE FROM subscriptions WHERE id = ' + subData.id , function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});			
		
	});
};

exports.updateById = function(conData, subData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//if no error prepare our user object with the values sent by the client
		let user = {
			username: subData.username,
			password: subData.password,
			firstName: subData.firstName,
			lastName: subData.lastName,
			registrationDate: subData.registrationDate
		};
		//perform the query
		data.query('UPDATE subscriptions SET ? WHERE id = ' + subData.id, user, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
		
	});
};