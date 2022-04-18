const fs = require('fs');
var resService = require("./reservation-service.js");
var path = require("path");
var express = require("express");
var app = express();
var multer = require("multer");
var exphbs = require('express-handlebars');


const bodyParser = require("body-parser");
const { status } = require('express/lib/response');


var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  resService.initialize().then(function(){
    console.log("success");
})};

// Register '.handlebars' extension with exphbs
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  //defaultView: 'default',
  partialsDir: path.join(__dirname, '/views/partials/')
}));
// Set our default template engine to "handlebars"
app.set('view engine', '.hbs');

// app.get('/views/partials/', (req, res) => {
//   res.render('header.hbs', {layout : 'index.html'});
//   });
  
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.render('index');
});

app.get("/reservations", function(req,res){
  res.render('reservations')
});
app.post("/reservations", function(req,res){
  resService.addReservation(req.body , res.redirect("/studentinfo"));
});
app.get("/studentinfo", function(req,res){
  res.render('studentinfo')
});
app.post("/studentinfo", function(req,res){
  resService.addStudent(req.body , res.redirect("/confirmation"));
});
app.get("/confirmation", function(req,res){
  resService.getReservations();
  resService.writeReservation();
  res.render('confirmation')
});
app.get("/cancelation", function(req,res){
  res.render('cancelation');
});
app.post("/cancelation", function(req,res){
  resService.checkCancelation(req.body , res.redirect("/viewCancel"));
});

app.get("/appointments", function(req,res){
  res.render("appointments");
});

app.post("/appointments", function(req,res){
  resService.getQuery(req.body , res.redirect("/viewAppointments"));
});

app.get("/viewAppointments", (req, res) => {
  resService.compareQuery().then((data) => {
    res.json(data);
}).catch((err) => {
    res.json({ message: "no results" });
})

});



app.get("/viewCancel", (req, res) => {
  resService.getCancelation().then((data) => {
    res.json(data);
}).catch((err) => {
    res.json({ message: "no results" });
})

});

app.get("/confirmcancelation", function(req,res){
  res.render("confirmcancelation");
});  

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname,"/views/errorpage.html"));
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
