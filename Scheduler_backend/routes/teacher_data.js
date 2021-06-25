const express = require('express') ;
const Router = express.Router() ;
var cors = require('cors');
Router.use(cors()) ;
const mysqlConnection = require('../db') ;
Router.get("/" , (req , res)=>{
    res. header("Access-Control-Allow-Origin", "*");
    mysqlConnection.query("SELECT * FROM Teacher_Schedule" , (err , rows , fields)=>{
        if(!err){
                res.send(rows)
        }
        else{
                console.log(err);
        }
    })
})
module.exports = Router ;