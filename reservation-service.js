const fs = require('fs');
const { resolve } = require('path');
const { reject } = require('promise');
let reservationArray=[];
let appointmentJson="";

module.exports.addReservation=function(reservationData){
    return new Promise((resolve,reject)=>{          
             if (reservationData.length == 0){
            reject("need data"); return;
        }
        resolve(reservationArray.push(reservationData));
    })
}
module.exports.addStudent=function(studentData){
    return new Promise((resolve,reject)=>{          
             if (studentData.length == 0){
            reject("need data"); return;
        }
        let i=reservationArray.length -1;
        resolve(Object.assign(reservationArray[i], {name: studentData.name, idnum: studentData.idnum, email: studentData.email, reservation: studentData.reservation}));
    })
}

module.exports.getReservations = function(){
    return new Promise((resolve,reject)=>{
        if (reservationArray.length == 0) {
            reject("no results returned"); return;
        }    
        appointmentJson = JSON.stringify(reservationArray);
        resolve(appointmentJson);
    })
}
module.exports.writeReservation = function(){
    return new Promise((resolve,reject)=>{
        if (reservationArray.length == 0) {
            reject("no results returned"); return;
        }    
        fs.readFile('./appointment.json', function (err, data) {
            var jsonData = JSON.parse(data);
            let appObj = appointmentJson.replace('[', '').replace(']','');
            let parsedAppObj = JSON.parse(appObj);
            jsonData.push(parsedAppObj);
        
            fs.writeFile("./appointment.json", JSON.stringify(jsonData,null,2),(err) => {
                if (err) {
                  console.log(err);
                }
        })
        resolve(jsonData);
    })
})}
