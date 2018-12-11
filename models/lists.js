'use strict'

var db = require('../database');

exports.add = function(conData, listData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		
		//perform the query
		conn.query('INSERT INTO lists SET ?', listData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};


exports.getAll = function(conData, listData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
				
		//perform the query
		data.query('SELECT * FROM lists', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});	
			
	});
};

exports.getById = function(conData, listData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM lists WHERE id = ' + listData.id , function (err, result) {
			//return control to the calling module
					
			callback(err, result);
		});
	});
};

exports.deleteById = function(conData, listData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		data.query('DELETE FROM lists WHERE id = ' + listData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
	});
};

exports.updateById = function(conData, listData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}

        //TODO server validation


		//perform the query
		conn.query('UPDATE lists SET ? WHERE id = ' + listData.id, listData, function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});
	
		
	});
};