const express = require('express')
const app = express()
const mysqlConnection = require('./db') ;
const morgan = require('morgan') ;
const Teacher_data = require('./routes/teacher_data')
const port = process.env.PORT || 3002 ;
var cors = require('cors');
app.use(cors())
app.use(morgan('dev')) ;
app.use(express.json());
app.use("/teacher_data" , Teacher_data) ;

app.get('/' , (req , res , next)=>{
  res. header("Access-Control-Allow-Origin", "*");
  res.send("Hello world") ;
})

app.post('/fetch', (req, res , next) => {
  res. header("Access-Control-Allow-Origin", "*");
  const request_for_save_data = req.body ;
    res.status(200).send(req.body) ;
    console.log(request_for_save_data) ;
    let teacher_name = request_for_save_data.Teacher_name ;
    let time_from = request_for_save_data.Time_from ;
    let time_to = request_for_save_data.Time_to ;
    let schedule_date = request_for_save_data.schedule_date ;
    console.log(schedule_date , time_from , time_to , typeof(schedule_date)) ;
    mysqlConnection.query("INSERT INTO Teacher_Schedule(Teacher_name , Time_from , Time_to , schedule_date) VALUES (? , ? , ? , ?)" , [teacher_name ,time_from, time_to , schedule_date]) ;
    next() ;
})
app.post('/delete', (req, res , next) => {
  res. header("Access-Control-Allow-Origin", "*");
  const request_for_save_data = req.body ;
    res.status(200).send(req.body) ;
    console.log(request_for_save_data) ;
    let teacher_name = request_for_save_data.Teacher_name ;
    let time_from = request_for_save_data.Time_from ;
    let time_to = request_for_save_data.Time_to ;
    let schedule_date = request_for_save_data.schedule_date ;
    console.log(schedule_date , time_from , time_to , typeof(schedule_date)) ;
    mysqlConnection.query("DELETE FROM Teacher_Schedule WHERE Teacher_name = ? AND Time_from = ? AND Time_to = ? AND schedule_date = ? " , [teacher_name ,time_from, time_to , schedule_date]) ;
})

app.use((req , res , next)=>{
  const error = new Error('Not found') ;
  error.status(404) ;
  next(error) ;
})

app.use((error , req , res, next)=>{
    res.status(500) ;
    return res.json({
      error : {
        message: error.message
      }
    })
}) ;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})