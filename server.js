'use strict'
//import express module
const express = require('express');
//import cors to enable cors
const cors = require('cors');
//import body parser
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

//create the express module
const server = express()

//To parse json data
server.use(bodyParser.json())

//enable all origins 
server.use(cors());

//enable cors for more complex routes
server.options('*', cors());

//allow static files to serve the images
server.use(express.static('public'));

server.use(fileUpload());
server.set('views', path.join(__dirname, 'views'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

//prepare our database connection parameters
const databaseData = { 
	host:"localhost",
	user:"root",
	password: "Pa55w0rd",
	database: "mywebsite"
};
//save server port on global variable
var port = 8080;

//----- add all routes to the api end points ------
routes.allRoutes(databaseData, server);

//start the server 
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`);

	}
})