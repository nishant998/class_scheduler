var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "beydvupvnavbzkivvs5s-mysql.services.clever-cloud.com",
    user: "ufqtpg57j03wkxpx",
    password: "oR9aIbrM84azAofGcZDx" , 
    insecureAuth : true ,
    database : "beydvupvnavbzkivvs5s" , 
    multipleStatements : true
  });
  
  mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = mysqlConnection ;