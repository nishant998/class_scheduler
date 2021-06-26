const express = require('express') ;
const Router = express.Router() ;

const mysqlConnection = require('../db') ;
Router.get("/" ,  function(req , res , next){
     mysqlConnection.query("SELECT * FROM Teacher_Schedule" , (err , rows , fields)=>{
        if(!err){
                res.send(rows) ;
        }
        else{
                console.log(err);
                mysqlConnection.release() ;
        }
    })
})
module.exports = Router ;