//jshint esversion:6
const express = require('express');
const app = express();
const ejs = require("ejs");
const parser = require('body-parser');
const users=[];
const md5=require('md5');
function resetCurrUser(){
  return new getUser('','','','','on','off',false);
}
function getUser(email,password,fname,lname,notif,remember,login){
  this.email=email;
  this.password=password;
  this.fname=fname;
  this.lname=lname;
  this.notif=notif;
  this.remember=remember;
  this.login=login;
  this.getName=function(){
    return this.fname+' '+this.lname;
  };
}

function verifyUser(curr_user){
  for(var i=0;i<users.length;i++){
    var user=users[i];
    if(curr_user.email === user.email && curr_user.password === user.password){
      curr_user.fname=user.fname;
      curr_user.lname=user.lname;
      curr_user.notif=user.notif;
      user.remember=curr_user.remember;
      curr_user.login=true;
      user.login=true;
      return {status: true,index:i};
    }
  }
    return {status: false, index:-1};
}


app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.listen(3000, function(req, res) {
  console.log('Server Started on localhost:3000');
});

app.get('/', function(req, res) {
  res.render('register.ejs',{status:''});
});

app.post('/', function(req, res) {
  if (req.body.hasOwnProperty('signup')) {

    if (req.body.hasOwnProperty('notifications')) {
      users.push(new getUser(req.body.email1,md5(req.body.pass1),req.body.fname,req.body.lname,req.body.notifications,'off',false));
    }else{
      users.push(new getUser(req.body.email1,md5(req.body.pass1),req.body.fname,req.body.lname,'on','off',false));
    }
    //send everything to db
    
    res.render('register.ejs',{status:'Successfuly Registered, Kindly Login'});
  }
   else if(req.body.hasOwnProperty('login')){
      var curr_user=resetCurrUser();
      curr_user.email = req.body.email2;
      curr_user.password = md5(req.body.pass2);
      if (req.body.hasOwnProperty('remember')) {
        curr_user.remember = req.body.remember;
      }else{
        curr_user.remember='off';
      }
      //Check in database
      const info=verifyUser(curr_user);
      if(info.status === true){
        res.redirect('/home?user='+info.index);
      }else{
        res.render('register.ejs',{status:'Not Registered yet, please register before login'});
      }
  }
  else if(req.body.hasOwnProperty('forgot')){
    res.send('forgot password page');
  }
  else{
    res.send('Error Occured');
  }
});

app.get('/home',function(req,res){
  if(Object.keys(req.query).length!==0){
  const index=req.query.user;
  if(index<users.length && index>=0 && users[index].login === true){
    users[index].login=false;
    var curr_user=users[index];
    res.render('home.ejs',{name:curr_user.getName()});
  }else{
    res.redirect('/');
  }
}else{
    //invalid login attempt
    res.redirect('/');
  }
});
