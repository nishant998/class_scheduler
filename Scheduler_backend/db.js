var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password" , 
    insecureAuth : true ,
    database : "Scheduler_data" , 
    multipleStatements : true
  });
  
  mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = mysqlConnection ;