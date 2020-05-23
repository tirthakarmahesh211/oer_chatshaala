//jshint esversion:6
const express = require('express');
const app = express();
const ejs = require("ejs");
const parser = require('body-parser');
const data = {
  email: '',
  password: '',
  fname: '',
  lname: '',
  notif: 'on',
  remember: 'off'
};

app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.listen(3000, function(req, res) {
  console.log('Server Started');
});
app.get('/', function(req, res) {
  res.render('register.ejs',{status:''});
});

app.post('/', function(req, res) {
  if (req.body.hasOwnProperty('signup')) {
    data.email = req.body.email1;
    data.password = req.body.pass1;
    data.fname = req.body.fname;
    data.lname = req.body.lname;
    if (req.body.hasOwnProperty('notifications')) {
      data.notif = req.body.notifications;
    }
    //send everything to db
    res.render('register.ejs',{status:'Successfuly Registered, Kindly Login'});
  } else if(req.body.hasOwnProperty('login')){
      data.email = req.body.email2;
      data.password = req.body.pass2;
      //data.fname = req.body.fname;//Populte from data base
      //data.lname = req.body.lname;//populate from database
    if (req.body.hasOwnProperty('remember')) {
      data.remember = req.body.remember;
    }else{
      //fetch from database
    }
    //fetch notif from db
    res.render('home.ejs');
  }else if(req.body.hasOwnProperty('forgot')){
    res.send('Forgot Password');
  }
  else{
    res.send('Error Occured');
  }
});
