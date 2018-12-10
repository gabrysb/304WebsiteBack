'use strict'

var db = require('../database');

//Add a new row
exports.add = function(conData, testData, callback){
	
    //Connect to the database
	db.connect(conData, function(err, conn){
		
		//Check for errors connecting
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//TODO server validation


		//perform the query
		conn.query('INSERT INTO test SET ?', testData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};

exports.getAll = function(conData, testData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM test', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
		
	});
};

exports.getById = function(conData, testData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('SELECT * FROM test WHERE id = ' + testData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});			
		
	});
};

exports.deleteById = function(conData, testData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('DELETE FROM test WHERE id = ' + testData.id , function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});			
		
	});
};

exports.updateById = function(conData, testData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//if no error prepare our user object with the values sent by the client
		let test = {
			testField: testData.testField,
		};
		//perform the query
		data.query('UPDATE test SET ? WHERE id = ' + testData.id, user, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
		
	});
};