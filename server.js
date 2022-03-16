const fs = require('fs');
var resService = require("./reservation-service.js");
var path = require("path");
var express = require("express");
var app = express();
var multer = require("multer");

const bodyParser = require("body-parser");
const { status } = require('express/lib/response');


var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/reservations", function(req,res){
  res.sendFile(path.join(__dirname,"/views/reservations.html"));
});
app.get("/studentinfo", function(req,res){
  res.sendFile(path.join(__dirname,"/views/studentinfo.html"));
});
app.get("/confirmation", function(req,res){
  res.sendFile(path.join(__dirname,"/views/confirmation.html"));
});
app.get("/cancelation", function(req,res){
  res.sendFile(path.join(__dirname,"/views/cancelation.html"));
});
app.get("/confirmcancelation", function(req,res){
  res.sendFile(path.join(__dirname,"/views/confirmcancelation.html"));
});
app.post("/resInfo/add", function(req,res){
  resService.addReservation(req.body /*, res.redirect("/reservations")*/);
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
