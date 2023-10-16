var mysql = require("mysql");

module.exports = function(){
    return mysql.createConnection({
        host:"athena-shop",
        user:"root",
        password:"",
        database:"athenashop",
        port: 3306
    });

};

