'use strict'
//import user module
const user = require('./models/user');
//import test module
const test = require('./models/test');
//import test module
const comment = require('./models/comments');
//import test module
const lists = require('./models/lists');
//import our product module which handles all CRUD operations on products
const recipe = require('./models/recipes');
//import the login module
const login = require('./models/login')
//import our database module which handles most of general db operations
const db = require('./database');
//import our module which adds dumpData
const dump = require('./dumpData');
//import authentication module
const auth = require('./authentication');
var cors = require('cors');

exports.allRoutes = function (databaseData, server) {

    //------------Test Routes-----------------
    server.post('/api/v1.0/test', (req, res) => {
    
        //ectract data from request
        let testData = {
            testField: req.body['testField']
        }
        
        //we are atempting to add a user
        test.add(databaseData, testData, function (err, data){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET, POST')
            //when adding a user is done, this code will run
            //if we got an error informs the client and set the proper response code
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            //if no error let's set proper response code and have a party
            res.status(201);
            res.end(JSON.stringify({message:"test added successfully"}));
        });
    })

    server.get('/api/v1.0/test', (req, res) => {
        
        //TODO: extract pagination & search parameters

        let testData = {
            
        };

        test.getAll(databaseData, testData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')

            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/test/:id', (req, res) => {

        let testData = {
            id : req.params.id
        }
        //we are atempting to retrieve one user
        //note that we get the user id through the req.params.id, id matches the path parameter name 
        test.getById(databaseData, testData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/test/:id',(req, res) => {
        
        let testData = {
            id : req.params.id
        }

        test.deleteById(databaseData, testData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(201);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/users/:id', (req, res) => {
        
        let testData = {
            id : req.params.id,
            testField: req.body['testField'],
        }
        //we are atempting to update a test field
        test.updateById(databaseData, testData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });

    //------------Users Routes-----------------
    server.post('/api/v1.0/users', (req, res) => {
    
        //ectract data from request
        let userData = {
            username: req.body['username'],
            password: req.body['password'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            registrationDate : new Date()
        }
        //we are atempting to add a user
        user.add(databaseData, userData, function (err, data){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET, POST')
            //when adding a user is done, this code will run
            //if we got an error informs the client and set the proper response code
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            //if no error let's set proper response code and have a party
            res.status(201);
            res.end(JSON.stringify({message:"user added successfully"}));
        });
    })

    server.get('/api/v1.0/users', (req, res) => {
        
        //TODO: extract pagination & search parameters

        let userData = {
            
        };

        user.getAll(databaseData, userData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')

            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/users/:id', (req, res) => {

        let userData = {
            id : req.params.id
        }
        //we are atempting to retrieve one user
        //note that we get the user id through the req.params.id, id matches the path parameter name 
        user.getById(databaseData, userData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/users/:id',(req, res) => {
        
        let userData = {
            id : req.params.id
        }

        user.deleteById(databaseData, userData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(201);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/users/:id', (req, res) => {
        
        let userData = {
            id : req.params.id,
            username: req.body['username'],
            password: req.body['password'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            registrationDate : req.body['registrationDate']
        }
        //we are atempting to update a user
        user.updateById(databaseData, userData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });

    //------------Login Routes-----------------
    server.post('/api/v1.0/login', (req, res) => {

        auth.loginUser(databaseData, req, (err, result) => {

            if(err){
                res.status(400);
                res.end("error:" + err.code);
                return;
            }

            let loginData = {
                userId: result.userId,
                loginDateTime : new Date()
            }

            //we are adding a login attempt
            login.add(databaseData, loginData, function (err, finalResult){
                
                // res.setHeader('content-type', 'application/json')
                // res.setHeader('accepts', 'POST')
                //when adding a user is done, this code will run
                //if we got an error informs the client and set the proper response code
                if(err){
                    console.log(err)
                    res.status(err.code);
                    res.end("error:" + err);
                    return;
                }
                //if no error let's set proper response code 
                res.status(201);
                res.end(JSON.stringify(loginData));
            });

            res.status(201);
                res.end(JSON.stringify(loginData));
        });
    });


    //------------Recipes Routes-----------------
    server.post('/api/v1.0/recipes', cors({origin: false}), (req, res) => {
        
        let recipeData = {
			title: req.body['title'],
			authorId: req.body['authorId'],
            description: req.body['description'],
            ingredients: req.body['ingredients'],
            steps: req.body['steps'],
			createdDate: new Date(),
            photo: req.body['photo'], 
            keywords: req.body['keywords'],
            category: req.body['category'],
            rating: 0,
            views: 0,
            status: req.body['status'],
            fileName: req.body['fileName'],
            encodedStr: req.body['encodedStr']
        };

        var base64Data = recipeData.encodedStr.replace(/^data:image\/png;base64,/, "");

        require("fs").writeFile('./public/img/'+recipeData.fileName, base64Data, 'base64', function (err) {
            console.log(err);
        });
        

        var temp = {
            title: req.body['title'],
            authorId: req.body['authorId'],
            description: req.body['description'],
            ingredients: req.body['ingredients'],
            steps: req.body['steps'],
            createdDate: new Date(),
            photo: req.body['photo'],
            keywords: req.body['keywords'],
            category: req.body['category'],
            rating: 0,
            views: 0,
            status: req.body['status']
        }

        recipe.add(databaseData, temp, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });

    });


    server.get('/api/v1.0/recipes', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let recipeData = {

        }
        recipe.getAll(databaseData, recipeData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/recipes/:id', (req, res) => {

        let recipeData = {
            id : req.params.id
        }

        recipe.getById(databaseData, recipeData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/recipes/:id',(req, res) => {
        
        let recipeData = {
            id : req.params.id
        }

        recipe.deleteById(databaseData, recipeData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/recipes/:id', (req, res) => {
        
        let recipeData = {
            title: req.body['title'],
			authorId: req.body['authorId'],
            description: req.body['body'],
            ingredients: req.body['ingredients'],
            steps: req.body['steps'],
			createdDate: new Date(),
            photo: req.body['photo'], 
            keywords: req.body['keywords'],
            category: req.body['category'],
            rating: 0,
            views: 0,
            status: req.body['status']
        }

        recipe.updateById(databaseData, recipeData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });

    //------------Subscription Routes-----------------
    server.post('/api/v1.0/subscriptions', (req, res) => {
        
        let subData = {
			userId: req.body['userId'],
			creatorId: req.body['creatorId']
        };
        
        subscription.add(databaseData, subData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/subscriptions', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let subData = {

        }
        subscription.getAll(databaseData, subData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/subscriptions/:id', (req, res) => {

        let subData = {
            id : req.params.id
        }

        subscription.getById(databaseData, subData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/subscriptions/:id',(req, res) => {
        
        let subData = {
            id : req.params.id
        }

        subscription.deleteById(databaseData, subData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/subscriptions/:id', (req, res) => {
        
        let subData = {
            userId: req.body['userId'],
			creatorId: req.body['creatorId']
        }

        subscription.updateById(databaseData, subData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });

    //------------Comments Routes-----------------
    server.post('/api/v1.0/comments', (req, res) => {
        
        let commentData = {
			listname: req.body['listname'],
			recipeid: req.body['recipeid'],
            userId: req.body['userId']
        };
        
        comment.add(databaseData, commentData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/comments', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let commentData = {

        }
        comment.getAll(databaseData, commentData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/comments/:id', (req, res) => {

        let commentData = {
            id : req.params.id
        }

        comment.getById(databaseData, commentData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/comments/:id',(req, res) => {
        
        let commentData = {
            id : req.params.id
        }

        comment.deleteById(databaseData, commentData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/comments/:id', (req, res) => {
        
        let commentData = {
            listname: req.body['listname'],
			recipeid: req.body['recipeid'],
            userId: req.body['userId']
        }

        comment.updateById(databaseData, commentData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });


    //------------Lists Routes-----------------
    server.post('/api/v1.0/lists', (req, res) => {
        
        let listData = {
			listname: req.body['listname'],
            recipeid: req.body['recipeid'],
            userId: req.body['userId']
        };
        
        lists.add(databaseData, listData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/lists', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let favData = {
            userId : req.query.userId
        }
        lists.getAll(databaseData, listData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/lists/:id', (req, res) => {

        let favData = {
            id : req.params.id
        }

        lists.getById(databaseData, listData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/lists/:id',(req, res) => {
        
        let listData = {
            id : req.params.id
        }

        lists.deleteById(databaseData, listData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/lists/:id', (req, res) => {
        
        let listData = {
            id : req.params.id,
            listname: req.body['listname'],
            recipeid: req.body['recipeid'],
            userId: req.body['userId']
        }

        lists.updateById(databaseData, listData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })



    //this route will allow to create tables in the database
    //it should be a confidential method and can be performed only by an admin
    server.post('/api/v1.0/admin/createTables', (req, res) => {
        
        db.createTables(databaseData, function(err, result){
            if(err) {
                res.status(400);
                res.end("an error has occured:" + err);
                return;
            }
            res.status(200);
            res.end("tables were created successfully");
        });
    });


    server.post('/api/v1.0/admin/addDumpData', (req, res) => {

        //TODO make this admin only task

        //dump some users and blogs data
        dump.addUsers(databaseData);
        dump.addRecipes(databaseData);

        res.status(200);
        res.end("dump data were added successfully");
        
    });

    
};