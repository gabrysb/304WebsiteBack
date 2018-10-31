exports.connect = function(conData, callback){
    var con = mysql.createConnection({
        host: conData.host,
        user: conData.user,
        password: conData.password,
        database: conData.database
    });

    con.connect(function(err) {
        if (err) callback(err);
        callback(null, con);
    });
};

exports.createTables = function (conData, callback){
    var con = mysql.createConnection({
        host: conData.host,
        user: conData.user,
        password: conData.password,
        database: conData.database
    });
    
    var sql = "CREATE TABLE Messages (from VARCHAR(255), email VARCHAR(32), url VARCHAR(32), message VARCHAR(4096))";
    con.query(sql, function (err, result) {
    console.log("finish query:" + result);
    callback(err, result);
    });
};