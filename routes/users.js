var express = require('express');
var router = express.Router();
const fs = require("fs");
/*db info*/
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

router.get('/api/test', function(req, res, next) {
  let sql = "SELECT * FROM temp";
  let params = [];

  connection.query(sql, params, (err, rows, fields) => {
    console.log(rows)
    res.send(rows);
  });
});  
   
router.post('/api/test', function(req, res, next) {
  let sql = "SELECT * FROM temp";
  let params = [];

  connection.query(sql, params, (err, rows, fields) => {
    console.log(rows)
    res.send(rows);
  });
});

module.exports = router;
  