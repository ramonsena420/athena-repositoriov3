var mysql = require("mysql");
const config_server = require("config/config.js");

module.exports = function(){
    return mysql.createConnection({
        host:   config_server.host,
        user:   config_server.user,
        password:   config_server.password,
        database:   config_server.database,
        port:   config_server.port
    });

};