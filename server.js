var path = require("path");
var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'))

// call this function after the http server starts listening for requests
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
app.get("/approval", function(req,res){
  res.sendFile(path.join(__dirname,"/public/Icons8_flat_approval.png"));
});


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
