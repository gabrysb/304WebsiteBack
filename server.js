//import restify module
var express = require('express');
//import our user module which handles all CRUD operations on users
var message = require('./message');
//import our database module which handles most of general db operations
var db = require('./database');

//create the app module
var app = express()

//initialise the server with required plugins
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//prepare our database connection parameters
const databaseData = {
	host:"localhost",
	user:"root",
	password: "Hermione1213",
	database: "304cem"
};
//save server port on global variable
var port = 8080;

//route any requests to http://localhost:8080/process_contact_submissio to this function
app.post('/index, (req, res) => {
	message.add(databaseData, req, function (err, data){
		//when adding a user is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
		res.status(201);
		res.end("success");
	})
})

app.get('/createTables', (req, res) => {
	
	db.createTables(databaseData, function(err, state){
		if(err) {
			res.status(400);
			res.end("an error has occured:" + err);
			return;
		}
		res.status(200);
		res.end("tables were created successfully");
	});
})

//start the server
app.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`)
	}
}) 