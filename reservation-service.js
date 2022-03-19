const fs = require('fs');
const { resolve } = require('path');
const { reject } = require('promise');
let reservationArray=[];

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
        let appointmentJson = JSON.stringify(reservationArray,null,2);
        fs.writeFileSync('./appointment.json', appointmentJson);
        resolve(reservationArray);
    })
}