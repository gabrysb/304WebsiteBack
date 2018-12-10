'use strict'
var db = require('../database');

exports.add = function(conData, recipeData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//TODO: server validation
		
		//perform the query
		conn.query('INSERT INTO recipes SET ?', recipeData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};


exports.getAll = function(conData, recipeData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
				
		//perform the query
		conn.query('SELECT * FROM recipes', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});	
			
	});
};

exports.getById = function(conData, recipeData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM recipes WHERE id = ' + recipeData.id , function (err, result) {
			//return control to the calling module
					
			callback(err, result);
		});
	});
};

exports.deleteById = function(conData, recipeData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('DELETE FROM recipes WHERE id = ' + recipeData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
	});
};

exports.updateById = function(conData, recipeData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}

		//TODO server validation

		//perform the query
		data.query('UPDATE recipes SET ? WHERE id = ' + recipeData.id, recipeData, function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});
	
		
	});
};