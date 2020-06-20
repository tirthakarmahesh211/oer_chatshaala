//jshint esversion:8
const https = require('https');
const secrets = require('./secrets.js');
const querystring = require('querystring');
module.exports = {
  resetCurrUser: resetCurrUser,
  getUser: getUser,
  verifyUser: verifyUser,
  addNewUser: addNewUser,
  fetchGroups: fetchGroups,
  fetch_Group: fetch_Group,
  fetchPosts: fetchPosts,
  createGroup: createGroup,
  search: search,
  request_summary: request_summary,
  showBadges: showBadges,
  create_topic: create_topic,
  pvt_msg: pvt_msg
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

function addNewUser(req, res, name, email, password, userName, identity) {
  const url = secrets.url + 'users';
  const user = new getUser(email, password, name, userName, identity);
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
    //console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        var result = JSON.parse(body);
        //console.log(result);
        if (result.success === true && result.active === true) {
          //console.log('yes');
          res.render('register.ejs', {
            status: 'Successfuly Registered, Kindly Login'
          });
        } else {
          //console.log('no');
          res.render('register.ejs', {
            status: result.message
          });
        }
      });
      response.on('error', function() {
        console.log('error');
        res.redirect('/register', {
          status: 'Error while registering, try again'
        });
      });
    } else {
      //console.log('no');
      res.redirect('/register', {
        status: 'Error while registering, try again'
      });
    }
  });
  request.write(data);
  request.end();
}

function verifyUser(req, res, userName, password) {
  const url = secrets.url + 'session/';

  var data = {
    'login': userName,
    'password': password,
    'second_factor_method': 1
  };

  data = querystring.stringify(data);

  const options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };

  var json_data = null;
  var request = https.request(url, options, function(response) {
    //console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      var result = '';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        result = JSON.parse(body);

        //console.log(result);
        json_data = result;
        if (result.error === 'Incorrect username, email or password') {
          res.render('register.ejs', {
            status: result.error
          });
        } else {
          fetchUserInfo(req, res, userName, password);
        }
      });
    } else {
      //console.log('no');
      res.render('register.ejs', {
        status: 'Not Registered yet, please register before login'
      });
    }
  });
  request.write(data);
  request.end();
}

function fetchUserInfo(req, res, userName, password) {
  var body = '';
  var url = secrets.url + 'users/' + userName + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };

  https.get(url, options, function(response) {
    //console.log(response.statusCode);
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      body = JSON.parse(body);
      req.session.user = body.user; //storing user info


      res.redirect('/chat');
    }).on('error', function() {
      console.log('error');
    });
  });

}


function fetchGroups(req, res, home, about, blog, project, feedback, logout, profile, curr_user) {
  var body = '';
  var url = secrets.url + 'categories' + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(secrets.url + '/latest.json', options, (response) => {
    var body1 = '';
    response.on('data', (data) => {
      body1 += data;
    });
    response.on('end', () => {
      body1 = JSON.parse(body1);
      var topics = body1.topic_list.topics;
      https.get(url, options, function(response) {
        response.on('data', function(data) {
          body += data;
          //console.log("hello");

        });
        response.on('end', function() {
          body = JSON.parse(body);
          var groups = [];
          groups = body.category_list.categories;

          // console.log(groups);

          res.render("groups.ejs", {
            curr_user: curr_user,
            home: home,
            about: about,
            blog: blog,
            project: project,
            feedback: feedback,
            logout: logout,
            profile: profile,
            groups: groups,
            topics: topics
          });

        });


      }).on('error', function() {
        console.log('errorr');
      });
    });
  });
}




function fetch_Group(req, res, home, about, blog, project, feedback, logout, profile, topic, id, curr_user) {
  var body = '';
  var body2 = '';
  var body3 = '';
  var topic_head = '';

  var url = secrets.url + 'categories' + '.json';
  var url3 = secrets.url + 'c/' + topic + "/" + id + '.json';
  //console.log(url3);
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(url, options, function(response) {
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      body = JSON.parse(body);

      var list = (body.category_list.categories);
      for (var i = 0; i < list.length; i++) {
        if (list[i].slug === topic) {
          topic_head = list[i];
          // console.log(topic_head);
        }
      }
      // console.log("1");
      https.get(url3, options, function(response) {
        response.on('data', function(data) {
          body2 += data;

        });
        response.on('end', function() {
          body2 = JSON.parse(body2);

          //console.log("2");
          https.get(url3, options, function(response) {
            response.on('data', function(data) {
              body3 += data;


            });
            response.on('end', function() {
              body3 = JSON.parse(body3);
              //  console.log(body3);

              res.render("group.ejs", {
                curr_user: curr_user,
                home: home,
                about: about,
                blog: blog,
                project: project,
                feedback: feedback,
                logout: logout,
                profile: profile,
                topic_head: topic_head,
                body3: body3
              });


            });

          });

        });

      });

    });

  });
}

//addded
function fetchPosts(req, res, home, about, blog, project, feedback, logout, profile, urid, curr_user) {
  var body = '';
  var url = urid;

  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(url, options, function(response) {
    if (response.statusCode > 300 && response.statusCode < 400) {
      url = response.headers.location;
      https.get(url, options, (response) => {
        response.on('data', function(data) {
          body += data;
          //console.log("hello");
        });
        response.on('end', function() {

          body = JSON.parse(body);
          //console.log(body.post_stream.posts);
          res.render("post.ejs", {
            curr_user: curr_user,
            home: home,
            about: about,
            blog: blog,
            project: project,
            feedback: feedback,
            logout: logout,
            profile: profile,
            body: body
          });
        });
      });
    } else {
      response.on('data', function(data) {
        body += data;
        //console.log("hello");
      });
      response.on('end', function() {
        //  console.log(body);
        body = JSON.parse(body);
        //console.log(body.category_id);
        res.render("post.ejs", {
          curr_user: curr_user,
          home: home,
          about: about,
          blog: blog,
          project: project,
          feedback: feedback,
          logout: logout,
          profile: profile,
          body: body
        });
      });
    }
  }).on('error', function() {
    console.log('errorr');
  });

}


function createGroup(req, res, item) {
  var url = secrets.url + "admin/groups";
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  var data = {
    "group[name]": item
  };
  data = querystring.stringify(data);
  var request = https.request(url, options, function(response) {
    //console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        var result = JSON.parse(body);
        //  console.log(result);
        if (result.basic_group.id != null) {
          {
            console.log('yes');
          }
        } else {
          console.log('no');
        }
      });
      response.on('error', function() {
        console.log('error');
      });
    } else console.log('no');
  });
  request.write(data);
  request.end();
}

function search(text, res) {
  var url = secrets.url + "/search/query?term=" + text + "&include_blurbs=true";
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Discourse-Visible': true,
      'DNT': 1,
      'Referer': secrets.url,
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Mobile Safari/537.36',
      'X-CSRF-Token': 'undefined',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  https.get(url, options, function(response) {
    var body = '';
    //  console.log(response.statusCode);
    response.on('data', function(data) {
      body += data;
      
      //console.log("hello");
    });
    response.on('end', function() {
      body = JSON.parse(body);
      console.log(body.categories);
      //console.log(body);
      if (body.grouped_search_result) {
        res.render('search.ejs', {
          users: body.users,
          posts: body.posts,
          groups: body.categories,
          topics: body.topics
        });
      } else {
        res.render('search.ejs', {
          users: [],
          posts: [],
          groups: [],
          topics: []
        });
      }
    });
  }).on('error', function() {
    console.log('error');
    res.redirect('/');
  });
}

function request_summary(res, obj, type) {
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  if (type === 'curr_profile') {
    var url = secrets.url + "admin/users/" + obj.curr_user.id + '.json';
    https.get(url, options, function(response) {
      var body = '';
      //  console.log(response.statusCode);
      if (response.statusCode === 200) {
        response.on('data', function(data) {
          body += data;
          //console.log("hello");
        });
        response.on('end', function() {
          body = JSON.parse(body);
          obj.curr_user_more = body;
          body = '';
          url = secrets.url + "users/" + obj.curr_user.username + '/summary.json';
          https.get(url, options, (response) => {
            if (response.statusCode === 200) {
              response.on('data', (data) => {
                body += data;
              });
              response.on('end', () => {
                body = JSON.parse(body);
                obj.summary = body;
                res.render('profile.ejs', obj);
              });
            } else {
              console.log('error');
            }
          });
        });
      }
    }).on('error', function() {
      console.log('error');
    });
  } else if (type === 'other_profile') {
    if(obj && obj.user_det && obj.user_det.id){
    var url1 = secrets.url + "admin/users/" + obj.user_det.id + '.json';
    https.get(url1, options, function(response) {
      var body = '';
      //  console.log(response.statusCode);
      if (response.statusCode === 200) {
        response.on('data', function(data) {
          body += data;
          //console.log("hello");
        });
        response.on('end', function() {
          body = JSON.parse(body);
          //console.log(body);
          obj.user_det_more = body;
          //console.log(body);
          body = '';
          url1 = secrets.url + "users/" + obj.user_det.username + '/summary.json';
          https.get(url1, options, (response) => {
            if (response.statusCode === 200) {
              response.on('data', (data) => {
                body += data;
              });
              response.on('end', () => {
                body = JSON.parse(body);
                obj.summary = body;
                //console.log(body.user_summary);
                res.render('user.ejs', obj);
              });
            } else {
              console.log('error');
            }
          });
        });
      }
    }).on('error', function() {
      console.log('error');
    });
  }else{
    res.redirect('/');
  }
  }
}


function showBadges(res, obj) {
  var url = secrets.url + 'user-badges/' + obj.curr_user.username + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(url, options, (response) => {
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        body = JSON.parse(body);
        obj.userBadges = body.user_badges;
        obj.badges = body.badges;
        res.render("badges.ejs", obj);
      });
    }
  });
}

function create_topic(req, res) {
  var title = req.body.title;
  var category = req.body.category;
  var desc = req.body.desc;
  var url = secrets.url + '/posts.json';
  var options = {
    method: "POST",
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': req.session.user.username
    }
  };
  var data1 = {
    "title": title,
    "raw": desc,
    "category": Number(category),
    "archetype": "regular"
  };
  //console.log(data1);
  var request = https.request(url, options, (response) => {
    //  console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        body = JSON.parse(body);
        //console.log(body);
        res.redirect('/post/t/' + body.topic_slug + '/' + body.topic_id + '/1');
      });
    } else {
      res.redirect('/');
    }
  });
  request.write(querystring.stringify(data1));
  request.end();
}


function pvt_msg(req, res) {
  var title = req.body.title;
  // var category=req.body.category;
  var desc = req.body.desc;
  var user = req.body.user_search;
  var url = secrets.url + '/posts.json';
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(secrets.url + 'users/' + user + '.json', (response) => {

    if (response.statusCode === 200) {
      var det = '';
      response.on('data', (chunk) => {
        det += chunk;
      });
      response.on('end', () => {
        det = JSON.parse(det);

        var data1 = {
          'title': title,
          'raw': desc,
          // “category”: Number(category),
          'target_recipients': det.user.username,
          'archetype': 'private_message'
        };
      //  console.log(data1);
        var request = https.request(url, options, (response) => {
        //  console.log(response.statusCode);
          if (response.statusCode === 200) {
            var body = '';
            response.on('data', (data) => {
              body += data;
            });
            response.on('end', () => {
              body = JSON.parse(body);
              //console.log(body);
            res.redirect('/chat');
            });
          } else {
            res.redirect('/');
          }
        });
        request.write(querystring.stringify(data1));
        request.end();
      });
    } else {
      res.redirect('/');
    }
  });
}
