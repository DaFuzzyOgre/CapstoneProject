const res = require('express/lib/response');
const { resolve } = require('path');
const { reject } = require('promise');
let reservationArray=[];
let appointmentJson="";
let pAppData=[];
let cancelInfo=[];
let elementarray=[];
let queryArray=[];
let matchArray=[];
const { response } = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://DaFuzzyOgre:Flavory15@capstone.qdnab.mongodb.net/Capstone?retryWrites=true&w=majority");

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Reservation = mongoose.model('Reservation', Schema({
    name:String, 
    idnum:String,
    email:String,
    reservation:String,
    confirmation:Number,
    date:String,
    time:String,
    numpeople:String,
    studyrooms:String,
    delete:String
}));

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports.addReservation=function(reservationData){
    return new Promise((resolve,reject)=>{          
             if (reservationData.length == 0){
            reject("need data"); return;
        }
        reservationArray =[];
        resolve(reservationArray.push(reservationData));
        reservationData = null;
    })
}
module.exports.addStudent=function(studentData){
    return new Promise((resolve,reject)=>{          
             if (studentData.length == 0){
            reject("need data"); return;
        }
        let confirmNum= getRandomInt(100000);
        let i=reservationArray.length -1;
        Object.assign(reservationArray[i], {name: studentData.name, idnum: studentData.idnum, email: studentData.email, reservation: studentData.reservation, delete: "False", confirmation:confirmNum});
        Object.keys(reservationArray).forEach(
            (key) => (reservationArray[key] === "") ? reservationArray[key] = null : reservationArray[key]
        );
        studentData =null;
        reservationArray = reservationArray[0];
        const doc = new Reservation(reservationArray);
        doc.save();
        resolve(reservationArray)
        reservationArray= null;
    })
}

module.exports.getReservations = async function(){
    await pause(2500);
    return new Promise((resolve,reject)=>{
        Reservation.find({})
        .exec()
        .then((reservation) => {
         reservation = reservation.map(value => value.toObject());
         i = reservation.length - 1;
         console.log(i);
        let lastReservation = reservation[i];
        reservation = null;
        i= 0;         
         resolve(lastReservation);
    })
})};

module.exports.cancelAppt = function (cancelInfo) {
    return new Promise(function (resolve, reject) {
       Reservation.deleteOne({confirmation: cancelInfo.confirmation}, function(err, result){
        if (err){
            reject("Error Finding Data")
        }
        else {
            console.log(result);
            resolve(result);
            
        
        }
       })
       
})};


module.exports.getQuery=function(queryData){
    return new Promise((resolve,reject)=>{          
        matchArray=[];
        this.initialize();
        if (queryData.length == 0){
            reject("need data"); return;
        }      
        queryArray= queryData;
        resolve(queryArray);
    })
}

module.exports.compareQuery=function(){
    return new Promise((resolve,reject)=>{ 
       
        pAppData.forEach(obj => {
            if (queryArray.confirmation == obj.confirmation || queryArray.idnum == obj.idnum || queryArray.name == obj.name || queryArray.email == obj.email || queryArray.reservation == obj.reservation   )
            {
               matchArray.push(obj);
            }
           });
           if (matchArray.length == 0){
               reject("no appointment found")
           }
           resolve(matchArray)
    })
}
module.exports.nullArray=function(){

    reservationArray=[];
    appointmentJson="";
    cancelInfo=[];
    elementarray=[];
    reservationData=[];

   
        
    }
