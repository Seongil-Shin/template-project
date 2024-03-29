const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
   host: "localhost",
   port: 3306,
   user: "root",
   password: process.env.MYSQL_PASSWORD,
   database: "users",
});

module.exports = connection;
