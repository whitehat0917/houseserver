var mysqlModel = require('mysql-model');
var db = require('../config/db.config');

const connection = mysqlModel.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

var users = connection.extend({
    tableName: "users",
});
module.exports = users;