document.addEventListener('DOMContentLoaded' , ()=>{
const DaysList = document.getElementById('Days_List') ;
const Event_popup = document.getElementById('event_popup') ;
const Manual_Event_popup = document.getElementById('manual_event_popup') ;
const Manual_Event_delete_popup = document.getElementById('manual_event_delete_popup') ;
const Teacher_name = document.getElementById('Teacher_name') ;
const Time_from = document.getElementById('Time_from') ;
const Time_to = document.getElementById('Time_to') ;
const Class_data_container_teacher_name = document.getElementById('class_data_container_teacher_name') ;
const All_Week = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'] ;
const All_year = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const Teachers_list = ["rajkumar rao" , "nawazuddin siddiqui" , "manoj bajpai" , "pankaj tripathi" , "kay kay menon"]

var month_route = 0 ;
let popup_date = null ;
// ========================dialog box popup when click on day===============================================================================
function Schedule_manipulation(today_date){
    popup_date = today_date ;
    Event_popup.style.display = 'block' ;
    var new_date = popup_date.split('-') ;
    if(new_date[1].length == 1){
       new_date[1] = "0"+new_date[1] ;
    }
    if(new_date[2].length == 1){
        new_date[2] = "0"+new_date[2] ;
    }
    var updated_date = new_date[0]+"-"+new_date[1]+"-"+new_date[2] ;
    document.getElementById('for_day').innerText = updated_date ;
}

// =================================dialog box popup when click on add button on bottom ============================================================

function manual_popup(){    
    Manual_Event_popup.style.display = 'flex' ;
}

// ===========================================dialog box popup when click on delete button on bottom ================================================

function manual_delete_popup(){    
    Manual_Event_delete_popup.style.display = 'flex' ;
}

// ========================================page load every time when someone change month from prev or next button ========================================

async function Page_loaded(){

    const dt = new Date() ;
    if(month_route!=0){
        dt.setMonth(new Date().getMonth() + month_route) ;
    }
    const date = dt.getDate() ;
    const month = dt.getMonth() ;
    const year = dt.getFullYear() ;
    const first_day_in_month = new Date(year , month , 1).getDay() ;
    const days_in_this_month = new Date(year , month+1 , 0).getDate() ;
    const days_before_month_start = first_day_in_month ;
     const Present_day = document.getElementById('present_day') ;
     Present_day.innerText = `${All_year[month]} ${year}` ;
    DaysList.innerHTML = "" ;
    for(let i = 1 ; i<=days_in_this_month+days_before_month_start ; i++)
    {
        const day_class = document.createElement('div') ;
        day_class.classList.add('each_day') ;
        if(i>days_before_month_start){
            day_class.innerText = i-days_before_month_start ;
            day_class.setAttribute('id' , `${month+1}day${i-days_before_month_start}`)
            day_class.addEventListener('click' , ()=>{
                
                Schedule_manipulation(`${year}-${month+1}-${i-days_before_month_start}`) ;
            })
        }else{
            day_class.classList.add('blank') ;
        }
        DaysList.appendChild(day_class) ;
    }

    let database_data =  await fetch('https://scheduler-backend-nishant.herokuapp.com/teacher_data') ;

        if (database_data.ok) { 
            const database_data_res = await database_data.json();
            
                let Class_data_container_teacher_name = document.getElementById('class_data_container_teacher_name') ;
                Class_data_container_teacher_name.innerHTML = `${Selected_teacher.value}` ;
            
            for(var j = 0 ; j<database_data_res.length ; j++)
            {
                    let date_str = database_data_res[j].schedule_date.split('-')
          if(date_str[2].charAt(0)==='0'){
              date_str[2] = date_str[2].slice(1);
            }
          if(date_str[1].charAt(0)==='0'){
              date_str[1] = date_str[1].slice(1);
            }
            var id_to_select = `${date_str[2]}` ;
            var id_to_select_mon = `${date_str[1]}` ;
            var res_id_str = `${id_to_select_mon}day${id_to_select}` ;
            if(date_str[1] == month+1){
                var day_ele = document.getElementById(`${res_id_str}`) ;
                day_ele.classList.add("saved") ;
            }
           }
    }
             else {
                alert("HTTP-Error: " + database_data.status);
            }
   
}

// ==============================================================dialog box popup close when click cancel or after saving schedule ===================================

function ClosePopup(){
     Teacher_name.value = "" ;
     Time_from.value = "" ;
     Time_to.value = "" ;
     popup_date = null ;
     Event_popup.style.display = 'none' ;
     Page_loaded() ;
}

// ===================================================================fucntion to save schedule when from day clicks =================================================

 async function  SaveScheduleData(){
    let Teacher_name = document.getElementById('Teacher_name') ;
    let Time_from = document.getElementById('Time_from') ;
    let Time_to = document.getElementById('Time_to') ;
    let schedule_date = document.getElementById('for_day') ;
    let database_data = await fetch('https://scheduler-backend-nishant.herokuapp.com/teacher_data');
    let check=false  ;
     Teacher_name.value = Teacher_name.value.toLowerCase() ;
    for(let k = 0 ; k<Teachers_list.length ; k++)
    {
        if(Teacher_name.value === Teachers_list[k]){
            check = true ;
        }
    }
    if(check===false){
        alert('Teacher name not recognized , select from left list')
        ClosePopup() ;
    }

    if (database_data.ok) { 
        const database_data_res = await database_data.json();
        for(var j = 0 ; j<database_data_res.length ; j++)
        {
           
            if(Teacher_name.value === database_data_res[j].Teacher_name){
                {
                    if(schedule_date.innerText === database_data_res[j].schedule_date){
                        if((Time_from.value>database_data_res[j].Time_from && Time_from.value<database_data_res[j].Time_to) || (Time_to.value>database_data_res[j].Time_from && Time_from.value<database_data_res[j].Time_to)){
                          
                            alert(`Teacher already exist with this schedule , ${database_data_res[j].Teacher_name} From :- ${database_data_res[j].Time_from} To :- ${database_data_res[j].Time_to}`) ;
                            ClosePopup() ;
                        }
                    }
                }
            }
        }
      } else {
        alert("HTTP-Error: " + database_data.status);
      }
      
    let data_array = [Teacher_name.value , Time_from.value , Time_to.value , schedule_date.innerText] ;
    if(Teacher_name.value=="" || Time_from.value=="" || Time_to.value==""){
        alert("Fill all values") ;
        Teacher_name.value = "" ;
        Time_from.value = "" ;
        Time_to.value="" ;
        Schedule_manipulation(schedule_date.innerText) ;
    }
    else{
        let Admin_set_data = {
                    Teacher_name: Teacher_name.value,
                    Time_from: Time_from.value , 
                    Time_to : Time_to.value ,
                    schedule_date : schedule_date.innerText
          };
          
          let response = await fetch('https://scheduler-backend-nishant.herokuapp.com/fetch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Admin_set_data)
          });
          alert("Class Scheduled");
          ClosePopup() ;
        } 
}

// ==================================================================delete class from click on day=========================================================

async function Delete_data_teacher(){
    let Teacher_name = document.getElementById('Teacher_name') ;
    let Time_from = document.getElementById('Time_from') ;
    let Time_to = document.getElementById('Time_to') ;
    let schedule_date = document.getElementById('for_day') ;
    Teacher_name.value = Teacher_name.value.toLowerCase() ;
    if(Teacher_name.value=="" || Time_from.value=="" || Time_to.value=="" ){
        alert("Fill all values") ;
    }else{

        let Admin_set_data = {
            Teacher_name: Teacher_name.value,
            Time_from: Time_from.value , 
            Time_to : Time_to.value ,
            schedule_date : schedule_date.innerText
    };
    
    let response = await fetch('https://scheduler-backend-nishant.herokuapp.com/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(Admin_set_data)
    });
    alert("Class Deleted");
    ClosePopup() ;
    }
}

// ====================================================delete of class from clicking on bottom button=========================================================

async function manual_delete_class(){
    let Teacher_name = document.getElementById('manual_Teacher_delete_name') ;
    let Time_from = document.getElementById('manual_Time_delete_from') ;
    let Time_to = document.getElementById('manual_Time_delete_to') ;
    let schedule_date = document.getElementById('manual_date_delete') ;
    Teacher_name.value = Teacher_name.value.toLowerCase() ;
    if(Teacher_name.value=="" || Time_from.value=="" || Time_to.value=="" || schedule_date.value==""){
        alert("Fill all values") ;
    }else{
           
        let Admin_set_data = {
            Teacher_name: Teacher_name.value,
            Time_from: Time_from.value , 
            Time_to : Time_to.value ,
            schedule_date : schedule_date.value
    };
    
    let response = await fetch('https://scheduler-backend-nishant.herokuapp.com/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(Admin_set_data)
    });
    alert("Class Deleted");
    ClosePopup() ;

    }
}

// =============================================================================view every teacher schedule======================================================

async function View_Teacher_Schedule(){
    let view_of_tech = document.getElementById('Selected_teacher') ;
    let Class_data_container = document.getElementById('class_data_container') ;
    view_of_tech.value = view_of_tech.value.toLowerCase() ;
    var test = Teachers_list.includes(`${view_of_tech.value}`);
    if(test===false){
        alert("No Teacher with this name , Write a correct name") ;
    }
    else{
        let database_data = await fetch('https://scheduler-backend-nishant.herokuapp.com/teacher_data');
        if (database_data.ok) { 
            const database_data_res = await database_data.json();
            if(  Class_data_container.style.display === "flex" ){
                let Class_data_container_teacher_name = document.getElementById('class_data_container_teacher_name') ;
                Class_data_container_teacher_name.innerHTML = `${Selected_teacher.value}` ;
            }
            Class_data_container.style.display = "flex" ;
            for(var j = 0 ; j<database_data_res.length ; j++)
            {
                const Class_data_container_teacher_name = document.getElementById('class_data_container_teacher_name') ;
                const new_div_for_data = document.createElement('div') ;
                new_div_for_data.classList.add('every_class')
                const Class_Date = document.createElement('div');
                Class_Date.classList.add('class_date') ;
                const Class_Time = document.createElement('div') ;
                Class_Time.classList.add('class_time') ;
                const From = document.createElement('div') ;
                From.classList.add('from') ;
                const To = document.createElement('div') ;
                To.classList.add('to') ;
                if(database_data_res[j].Teacher_name === Selected_teacher.value){
                    Class_data_container_teacher_name.appendChild(new_div_for_data) ;
                    new_div_for_data.appendChild(Class_Date) ;
                    new_div_for_data.appendChild(Class_Time) ;
                    Class_Time.appendChild(From) ;
                    Class_Time.appendChild(To) ;
                }
                Class_Date.innerText = `Date : ${database_data_res[j].schedule_date}` ;
                From.innerText = `From: ${database_data_res[j].Time_from}` ;
                To.innerText = `To: ${database_data_res[j].Time_to}` ;
            }
            } else {
                alert("HTTP-Error: " + database_data.status);
            }
    }
}

// =======================================================================add class manually after clicking on the bottom add class button===============================

async function  manual_add_class(){
    let Teacher_name = document.getElementById('manual_Teacher_name') ;
    let Time_from = document.getElementById('manual_Time_from') ;
    let Time_to = document.getElementById('manual_Time_to') ;
    let schedule_date = document.getElementById('manual_date') ;
    let database_data = await fetch('https://scheduler-backend-nishant.herokuapp.com/teacher_data');
    let check=false  ;
    Teacher_name.value = Teacher_name.value.toLowerCase() ;
    for(let k = 0 ; k<Teachers_list.length ; k++)
    {
        if(Teacher_name.value === Teachers_list[k]){
            check = true ;
        }
    }
    if(check===false){
        alert('Teacher name not recognized , select from left list')
        ClosePopup() ;
    }

    if (database_data.ok) { 
        const database_data_res = await database_data.json();
        for(var j = 0 ; j<database_data_res.length ; j++)
        {
           
            if(Teacher_name.value === database_data_res[j].Teacher_name){
                {
                    if(schedule_date.value === database_data_res[j].schedule_date){
                        if((Time_from.value>database_data_res[j].Time_from && Time_from.value<database_data_res[j].Time_to) || (Time_to.value>database_data_res[j].Time_from && Time_from.value<database_data_res[j].Time_to)){
                          
                            alert(`Teacher already exist with this schedule , ${database_data_res[j].Teacher_name} From :- ${database_data_res[j].Time_from} To :- ${database_data_res[j].Time_to}`) ;
                            // delete_entry()
                            ClosePopup() ;
                        }
                    }
                }
            }
        }
      } else {
        alert("HTTP-Error: " + database_data.status);
      }
      
    let data_array = [Teacher_name.value , Time_from.value , Time_to.value , schedule_date.value] ;
    if(Teacher_name.value=="" || Time_from.value=="" || Time_to.value==""){
        alert("Fill all values") ;
        Teacher_name.value = "" ;
        Time_from.value = "" ;
        Time_to.value="" ;
        Schedule_manipulation(schedule_date.value) ;
    }
    else{
        let Admin_set_data = {
                    Teacher_name: Teacher_name.value,
                    Time_from: Time_from.value , 
                    Time_to : Time_to.value ,
                    schedule_date : schedule_date.value
          };
          
          let response = await fetch('https://scheduler-backend-nishant.herokuapp.com/fetch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Admin_set_data)
          });
          alert("Class Scheduled");
          ClosePopup() ;
        } 
}

// ================================================================================event listener for every button used in this application============================

function Button_clicks(){
const Priv = document.getElementById('prev') ;
const Next = document.getElementById('next') ;
const Save = document.getElementById('save') ;
const Delete = document.getElementById('delete') ;
const Cancel = document.getElementById('cancel') ;
const View = document.getElementById('Selecte_tec') ;
const Manual_add = document.getElementById('manual_add') ;
const Manual_delete = document.getElementById('manual_delete') ;
const Manual_submit_add = document.getElementById('manual_submit_add') ;
const Manual_submit_delete = document.getElementById('manual_submit_delete') ;
Priv.addEventListener('click' , ()=>{
    month_route-- ;
    Page_loaded() ;
})
Next.addEventListener('click' , ()=>{
    month_route++ ;
    Page_loaded() ;
})
Save.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    SaveScheduleData() ;
})
Delete.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    Delete_data_teacher() ;
})
Cancel.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    ClosePopup() ;
}) ;
View.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    View_Teacher_Schedule() ;
})
Manual_add.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    manual_popup() ;
})
Manual_delete.addEventListener('click' , (e)=>{
    e.preventDefault() ;
    manual_delete_popup() ;
})
Manual_submit_add.addEventListener('click' , (e)=>{
    e.preventDefault();
    manual_add_class() ;
})
Manual_submit_delete.addEventListener('click' , (e)=>{
    e.preventDefault();
    manual_delete_class() ;
})

}
Button_clicks() ;
Page_loaded() ;

})