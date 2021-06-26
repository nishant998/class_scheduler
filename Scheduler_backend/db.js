var mysql = require('mysql');

var mysqlConnection = mysql.createPool({
    host: "beydvupvnavbzkivvs5s-mysql.services.clever-cloud.com",
    user: "ufqtpg57j03wkxpx",
    password: "oR9aIbrM84azAofGcZDx" , 
    database : "beydvupvnavbzkivvs5s" , 
    connectionLimit : 10 ,
    multipleStatements : true
  });

  mysqlConnection.getConnection(function(err,conn) {
    console.log("before error")
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = mysqlConnection ;