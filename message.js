var db = require('./database');

//this function is responsible for adding a new user
exports.add = function(conData, req, callback){

    //first connect to DB
    db.connect(conData, function(err, data){

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        //if no error prepare our user object with the values sent by the client
        var message = {
            fromName: req.body['fromName'],
            fromEmail: req.body['fromEmail'],
            url: req.body['url'],
            message: req.body['message']
        };
        //perform the query 

        data.query('INSERT INTO Messages SET ?', message, function (err, result) {
        //return control to the calling module
            callback(err, message);
        });
    });
};