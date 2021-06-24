const express = require('express')
const app = express()
const mysqlConnection = require('./db') ;
const Teacher_data = require('./routes/teacher_data')
var cors = require('cors')
const port = 3002

app.use(cors())
app.use(express.json());
app.use("/teacher_data" , Teacher_data) ;

app.post('/fetch', (req, res) => {
  const request_for_save_data = req.body ;
    res.status(200).send(req.body) ;
    console.log(request_for_save_data) ;
    let teacher_name = request_for_save_data.Teacher_name ;
    let time_from = request_for_save_data.Time_from ;
    let time_to = request_for_save_data.Time_to ;
    let schedule_date = request_for_save_data.schedule_date ;
    console.log(schedule_date , time_from , time_to , typeof(schedule_date)) ;
    mysqlConnection.query("INSERT INTO Teacher_Schedule(Teacher_name , Time_from , Time_to , schedule_date) VALUES (? , ? , ? , ?)" , [teacher_name ,time_from, time_to , schedule_date]) ;
})
app.post('/delete', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})