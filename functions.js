//jshint esversion:6
const users = [];
const https = require('https');
const secrets = require('./secrets.js');
const querystring = require('querystring');
module.exports = {
  resetCurrUser: resetCurrUser,
  getUser: getUser,
  verifyUser: verifyUser,
  users: users,
  addNewUser:addNewUser,
  fetchUser:fetchUser
};

function resetCurrUser() {
  return new getUser('', '', '', '', '');
}


function getUser(email, password, name, userName, identity) {
  this.email = email;
  this.password = password;
  this.name = name;
  this.userName = userName;
  this.identity = identity;
}

function verifyUser(curr_user) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (curr_user.userName === user.userName && curr_user.password === user.password) {
      curr_user.name = user.name;
      curr_user.email = user.email;
      curr_user.identity = user.identity;
      curr_user.login = true;
      user.login = true;
      return {
        status: true,
        index: i
      };
    }
  }
  return {
    status: false,
    index: -1
  };
}

function addNewUser(req,res,name, email, password, userName, identity) {
  const url = secrets.url + 'users';
  const user=new getUser(email,password,name,userName,identity);
  const options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  var data = {
    "name": name,
    "email": email,
    "password": password,
    "username": userName,
    "active": true,
    "approved": true,
    "user_fields[1]": identity
  };
  data = querystring.stringify(data);
  var request = https.request(url, options, function(response) {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        var result = JSON.parse(body);
        console.log(result);
        if (result.success === true && result.active === true) {
          users.push(user);
          console.log('yes');
          res.render('register.ejs', {status: 'Successfuly Registered, Kindly Login'});
        } else {
          console.log('no');
          if(!users.includes(user)){
            users.push(user);
          }
          res.render('register.ejs', {status: result.message});
        }
      });
      response.on('error', function() {
        console.log('error');
        res.redirect('/', {status:'Error while registering, try again'});
      });
    } else {
      console.log('no');
      res.redirect('/', {status:'Error while registering, try again'});
    }
  });
  request.write(data);
  request.end();
}

function fetchUser(req,res,userName,password){
  var body = '';
  var url = secret.url + 'users/' + userName + '.json';
  var options = {
  method: 'GET',
  headers: {
    'Api-Key': secret.key,
    'Api-Username': 'system'
  }
};
https.get(url, options, function(response) {
  console.log(response.statusCode);
  if(response.statusCode===200){
  response.on('data', function(data) {
    body += data;
  });
  response.on('end', function() {
    body = JSON.parse(body);
    //console.log(body);
    var uname= body.user.username;
    req.session.user=body.user.id;
    res.redirect('/home');
  }).on('error', function() {
    console.log('error');
    res.redirect('/');
  });
 }
 res.redirect('/home');
});

}
