//jshint esversion:6
const express = require('express');
const app = express();
const ejs = require("ejs");
const parser = require('body-parser');
const users = [];
const md5 = require('md5');
const home = '/home?user=';
const feedback = '/feedback?user=';
const about = '/about?user=';
const FAQ = '/FAQ?user=';
const Terms = '/Terms?user=';
const privacy = '/privacy?user=';
const blog = '/blog?user=';
const logout = '/logout?user=';
const project = '/project?user=';

function resetCurrUser() {
  return new getUser('', '', '', '', 'on', 'off', false, false);
}


function getUser(email, password, fname, lname, notif, remember, login, session) {
  this.email = email;
  this.password = password;
  this.fname = fname;
  this.lname = lname;
  this.notif = notif;
  this.remember = remember;
  this.login = login;
  this.session = session;
  this.getName = function () {
    return this.fname + ' ' + this.lname;
  };
}

function verifyUser(curr_user) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (curr_user.email === user.email && curr_user.password === user.password && !user.login && !user.session) {
      curr_user.fname = user.fname;
      curr_user.lname = user.lname;
      curr_user.notif = user.notif;
      user.remember = curr_user.remember;
      curr_user.login = true;
      user.login = true;
      return {
        status: true,
        index: i
      };
    } else if (curr_user.email === user.email && curr_user.password === user.password && !user.login && user.session) {
      return {
        status: true, index: -1
      };
    }
  }
  return {
    status: false,
    index: -1
  };
}

function masterControl(req, res, option) {
  if (option === 'home') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].login === true && users[index].session === false) {
        users[index].login = false;
        users[index].session = true;
        return true;
      } else if (!isNaN(index) && index < users.length && index >= 0 && users[index].login === false && users[index].session === true) {
        return true;
      }
      else {
        //Limiting to one login
        return false;
      }
    } else {
      //invalid login attempt
      return false;
    }
  }

  else if (option === 'feedback') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  else if (option === 'about') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  else if (option === 'blog') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  else if (option === 'project') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  else if (option === 'FAQ') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  else if (option === 'Terms') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  else if (option === 'privacy') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  else if (option === 'logout') {
    if (Object.keys(req.query).length !== 0) {
      const index = req.query.user;
      if (!isNaN(index) && index < users.length && index >= 0 && users[index].session === true && users[index].login === false) {
        users[index].login = false; users[index].session = false;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.listen(3000, function (req, res) {
  console.log('Server Started on localhost:3000');
});

app.get('/', function (req, res) {
  res.render('register.ejs', {
    status: ''
  });
});

app.post('/', function (req, res) {
  if (req.body.hasOwnProperty('signup')) {

    if (req.body.hasOwnProperty('notifications')) {
      users.push(new getUser(req.body.email1, md5(req.body.pass1), req.body.fname, req.body.lname, req.body.notifications, 'off', false, false));
    } else {
      users.push(new getUser(req.body.email1, md5(req.body.pass1), req.body.fname, req.body.lname, 'on', 'off', false, false));
    }
    //send everything to db

    res.render('register.ejs', {
      status: 'Successfuly Registered, Kindly Login'
    });
  } else if (req.body.hasOwnProperty('login')) {
    var curr_user = resetCurrUser();
    curr_user.email = req.body.email2;
    curr_user.password = md5(req.body.pass2);
    if (req.body.hasOwnProperty('remember')) {
      curr_user.remember = req.body.remember;
    } else {
      curr_user.remember = 'off';
    }
    //Check in database
    const info = verifyUser(curr_user);
    if (info.status === true && info.index !== -1) {
      res.redirect('/home?user=' + info.index);
    } else if (info.status === true && info.index === -1) {
      res.render('register.ejs', {
        status: 'Already Logged in somewhere, logout first'
      });
    }
    else {
      res.render('register.ejs', {
        status: 'Not Registered yet, please register before login'
      });
    }
  } else if (req.body.hasOwnProperty('forgot')) {
    res.send('forgot password page');
  } else {
    res.send('Error Occured');
  }
});

app.get('/home', function (req, res) {
  if (masterControl(req, res, 'home')) {
    const index = req.query.user;
    var curr_user = users[index];
    res.render('home.ejs', {
      home: home + index, about: about + index, blog: blog + index, project: project + index, feedback: feedback + index, logout: logout + index, name: curr_user.getName()
    });
  } else {
    res.redirect('/');
  }
});

app.get("/feedback", function (req, res) {
  if (masterControl(req, res, 'feedback')) {
    const index = req.query.user;
    const user = users[index];
    res.render("feedback.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});


app.get("/about", function (req, res) {
  if (masterControl(req, res, 'about')) {
    const index = req.query.user;
    const user = users[index];
    res.render("about.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});
app.get("/blog", function (req, res) {
  if (masterControl(req, res, 'blog')) {
    const index = req.query.user;
    const user = users[index];
    res.render("blog.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});
app.get("/project", function (req, res) {
  if (masterControl(req, res, 'project')) {
    const index = req.query.user;
    const user = users[index];
    res.render("project.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});
app.get("/FAQ", function (req, res) {
  if (masterControl(req, res, 'about')) {
    const index = req.query.user;
    const user = users[index];
    res.render("FAQ.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});
app.get("/Terms", function (req, res) {
  if (masterControl(req, res, 'about')) {
    const index = req.query.user;
    const user = users[index];
    res.render("Terms.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
}); app.get("/privacy", function (req, res) {
  if (masterControl(req, res, 'about')) {
    const index = req.query.user;
    const user = users[index];
    res.render("privacy.ejs", { home: home + index, about: about + index, blog: blog + index, project: project + index, FAQ: FAQ + index, Terms: Terms + index, privacy: privacy + index, feedback: feedback + index, logout: logout + index });
  } else {
    res.redirect('/');
  }
});

app.post("/feedback", function (req, res) {

  var type = req.body.options;
  var topic = req.body.topic;
  var desc = req.body.desc;
  var rate = req.body.ratings;
  // console.log(req.body);
  res.send(type + " " + topic + " " + desc + " " + rate);
  //res.send(req.body.topic+" "+req.body.desc+" "+res.body.options);
});



app.get('/logout', function (req, res) {
  if (masterControl(req, res, 'logout')) {
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});
