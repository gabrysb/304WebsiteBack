'use strict'

const db = require('../database');
const authentication = require('../authentication');

var data = {};

exports.add = function (conData, req, callback) {

    data = req;

    db.connect(conData, function (err, conn) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        let loginData = {
            userId: data.userId,
            dateAndTime: new Date()
        }
        //perform the query
        conn.query('INSERT INTO logins SET ?', loginData, function (err, result) {

            if (err) {
                callback(err);
                return;
            }
            //return control to the calling module
            callback(err, result);
        });
    });

};