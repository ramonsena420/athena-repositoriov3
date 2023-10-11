var mysql = require("mysql2");

module.exports = function(){
    return mysql.createConnection({
        host:"athena-shop",
        user:"root",
        password:"",
        database:"athenashop",
        port: 3306
    });
}