var resService = require("./reservation-service.js");
var path = require("path");
var express = require("express");
var app = express();
var multer = require("multer");
const bodyParser = require("body-parser");
const { status } = require('express/lib/response');
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs',
  defaultLayout: "main",
  helpers: { 
      navLink: function(url, options){
          return '<li' + 
              ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
              '><a href="' + url + '">' + options.fn(this) + '</a></li>';
      },
      equal: function (lvalue, rvalue, options) {
          if (arguments.length < 3)
              throw new Error("Handlebars Helper equal needs 2 parameters");
          if (lvalue != rvalue) {
              return options.inverse(this);
          } else {
              return options.fn(this);
          }
      }
  } 
}));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
};

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/reservations", function(req,res){
  res.sendFile(path.join(__dirname,"/views/reservations.html"));
});
app.post("/reservations", function(req,res){
  resService.addReservation(req.body , res.redirect("/studentinfo"));
});
app.get("/studentinfo", function(req,res){
  res.sendFile(path.join(__dirname,"/views/studentinfo.html"));
});
app.post("/studentinfo", function(req,res){
  resService.addStudent(req.body , res.redirect("/confirmation"));
});
app.get("/confirmation", function(req,res){
  resService.getReservations().then((data) => {
    res.render("confirmation", {lastReservation:data});
}).catch((err) => {
    res.render("confirmation",{ message: "no results" });
});
});
app.get("/cancelation", function(req,res){
  res.sendFile(path.join(__dirname,"/views/cancelation.html"));
});
app.post("/cancelation", function(req,res){
  resService.cancelAppt(req.body).then((result)=>{
    if (result.deletedCount == 0)
    {
      res.redirect("/");
    }
    else{res.redirect("/confirmcancelation");}
    }).catch((err) => {
        res.status(500).send("Unable to Remove Appointment/ Appointment not found");
    });
});


app.get("/edithome", function(req,res){
  res.sendFile(path.join(__dirname,"/views/edithome.html"));
});
app.post("/edithome", function(req,res){
  resService.cancelAppt(req.body).then(()=>{
    res.redirect("/editinfo");
    }).catch((err) => {
        res.status(500).send("Unable to find existing reservation");
    });
});

app.get("/editinfo", function(req,res){
  res.sendFile(path.join(__dirname,"/views/editinfo.html"));
});

app.post("/editinfo", function(req,res){
  resService.addReservation(req.body , res.redirect("/views/editinfo.html"));
});

app.get("/allappointments", function(req,res){
  resService.getAllReservations().then((data) => {
    res.render("allreservations", {reservations:data});
  }).catch((err) => {
      res.render("allreservations",{ message: "no results" });
  });
  });

app.get("/appointments", function(req,res){
  res.sendFile(path.join(__dirname,"/views/appointments.html"));
});
app.get("/appointments/delete/:confirmation", (req,res) => {
  resService.deleteAppointmentByConfirm(req.params.confirmation).then(()=>{
      res.redirect("/allappointments");
  }).catch((err) => {
      res.status(500).send("Unable to Remove Appointment");
  });
});
app.get("/rejection", function(req,res){
      res.render("rejectcancelation");
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
app.get("/confirmcancelation", function(req,res){
  res.sendFile(path.join(__dirname,"/views/confirmcancelation.html"));
});  

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname,"/views/errorpage.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
