const res = require('express/lib/response');
const fs = require('fs');
const { resolve } = require('path');
const { reject } = require('promise');
let reservationArray=[];
let appointmentJson="";
let pAppData=[];
let cancelInfo=[];
let elementarray=[];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
module.exports.initialize=function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./public/appointment.json', function (err, appData) {
            pAppData = JSON.parse(appData);          
        if (pAppData.length == 0){
       reject("no data found"); return;
   }
   resolve(pAppData)
})})};

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
        let confirmNum= getRandomInt(100000);
        let i=reservationArray.length -1;
        resolve(Object.assign(reservationArray[i], {name: studentData.name, idnum: studentData.idnum, email: studentData.email, reservation: studentData.reservation, delete: "False", confirmation:confirmNum}));
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
        fs.readFile('./public/appointment.json', function (err, data) {
            var jsonData = JSON.parse(data);
            let appObj = appointmentJson.replace('[', '').replace(']','');
            let parsedAppObj = JSON.parse(appObj);
            jsonData.push(parsedAppObj);
        
            fs.writeFile("./public/appointment.json", JSON.stringify(jsonData,null,2),(err) => {
                if (err) {
                  console.log(err);
                }
        })
        resolve(jsonData);
    })
})}



module.exports.checkCancelation=function(cancelData){
    return new Promise((resolve,reject)=>{          
        if (cancelData.length == 0){
            reject("need data"); return;
        }      
        
        resolve(cancelInfo.push(cancelData));
    })
}

module.exports.getCancelation=function(){
    return new Promise((resolve,reject)=>{ 
       
        pAppData.forEach(element => {
         if (cancelInfo[0].confirmation == element.confirmation && cancelInfo[0].idnum == element.idnum)
         {
            elementarray.push(element);
         }
        });
        if (elementarray.length == 0){
            reject("no appointment found")
        }
        else{ resolve(elementarray)}
    })
}