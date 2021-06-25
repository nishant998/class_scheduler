const express = require('express') ;
const Router = express.Router() ;
const morgan = require('morgan')
var cors = require('cors');
Router.use(cors()) ;
Router.use(morgan('dev')) ;
const mysqlConnection = require('../db') ;
Router.get("/" , (req , res , next)=>{
    res. header("Access-Control-Allow-Origin", "*");
    mysqlConnection.query("SELECT * FROM Teacher_Schedule" , (err , rows , fields)=>{
        if(!err){
                res.send(rows) ;
        }
        else{
                console.log(err);
        }
    })
})
module.exports = Router ;