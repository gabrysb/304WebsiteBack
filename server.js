//import express package and save it in the express variable
var express = require('express');
//create a new instance of express and save it in a variable called app
var app = express();
var bodyParser = require('body-parser'); 
app.use(express.static('public'));

 // Create application/x-www-form-urlencoded parser
 app.use(bodyParser.urlencoded({ extended: false }));


//save the port globally
var port = 8080;

//we need now to define routes for our web server
//first any requests that comes to the root serve this function
//note that this is an asynchronous  code
//note that a call back function has been passed which receives two variables
//req which contains client request information
//res which is the response we will send to the client
app.get('/', function(req, res){
	//our response will be just a string Hello World
	var swig  = require('swig');

	var lang = req.query.lang;
	if(lang == "ar")
	{
		var template = swig.compileFile(__dirname + '/public/html/index.html');
	}
	else if(lang == "fr")
	{
		var template = swig.compileFile(__dirname + '/public/html/index.html');
	}
	else
	{
		var template = swig.compileFile(__dirname + '/public/html/index.html');
	} 
	
	var output = template({});
	
   res.send(output);
});

console.log(__dirname);

app.post('/process_contact_submission', function (req, res) {
	
	// first thing extract all the values from the request
	var data = {
	fromName:req.body.fromName,
	fromEmail:req.body.fromEmail
	};
	
	// then do server validation
	// some code…
	
	// if valid save the contact message in DB
	
	// finally send a response to the user depends on what happened with his data
	console.log(response);
	res.end(JSON.stringify(data));
	})

//now run the server  at port 8080
app.listen(port);