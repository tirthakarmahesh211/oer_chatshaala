//jshint esversion:8
const https = require('https');
const secrets = require('./secrets.js');
const querystring = require('querystring');
const fetch = require('node-fetch');
const FormData = require('form-data');
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
  pvt_msg: pvt_msg,
  reply_pvt:reply_pvt,
  reply_to_specific_pvt_msg:reply_to_specific_pvt_msg,
  delete_posts: delete_posts,
  upload_file: upload_file,
  get_topic: get_topic,
  get_categories: get_categories,
  get_sub_category: get_sub_category,
  get_topics: get_topics,
  get_specific_posts: get_specific_posts,
  get_posts_using_post_ids: get_posts_using_post_ids,
  get_post_replies: get_post_replies,
  like:like,
  advanced_search: advanced_search,
  search_topics_and_posts: search_topics_and_posts,
  get_specific_post_replies: get_specific_post_replies,
  unlike: unlike,
  get_specific_post_by_id: get_specific_post_by_id,
  update_posts_raw_by_id: update_posts_raw_by_id
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


      // res.redirect('/chat');
      res.redirect('/');
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
      if(body1 && body1.topic_list && body1.topic_list.topics){
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
            topics: topics,
            url:secrets.url
          });

        });

      }).on('error', function() {
        console.log('errorr');
      });
    }else{

    }
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
                body3: body3,
                url:secrets.url
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
      res.send(body);
      //console.log(body.categories);
      //console.log(body);
      // if (body.grouped_search_result) {
      //   res.render('search.ejs', {
      //     users: body.users,
      //     posts: body.posts,
      //     groups: body.categories,
      //     topics: body.topics,
      //     url:secrets.url
      //   });
      // } else {
      //   res.render('search.ejs', {
      //     users: [],
      //     posts: [],
      //     groups: [],
      //     topics: [],
      //     url:secrets.url
      //   });
      // }
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

  if(req.body!=null && req.body != undefined){
  var title = req.body.title;
  // var category=req.body.category;
  var desc = req.body.desc;
  var user_search = req.body.user_search;
  }
  else if(req.query!=null && req.query != undefined){
  var title = req.query.title;
  // var category=req.body.category;
  var desc = req.query.desc;
  var user_search = req.query.user_search;
  }
  // console.log(req.query);
  var url = secrets.url + '/posts.json';
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': req.session.user.username
    }
  };
  // console.log(req.body);
  // console.log(req.query.category);
  // console.log(req.query);
  // console.log(desc);
  // console.log(title);
  // https.get(secrets.url + 'users/' + user + '.json', (response) => {

  //   if (response.statusCode === 200) {
  //     var det = '';
  //     response.on('data', (chunk) => {
  //       det += chunk;
  //     });
  //     response.on('end', () => {
  //       det = JSON.parse(det);
  //       console.log(det.user.username);
        if(req.body && req.body.category!=null && req.body.category!=undefined && req.body.category !=''){
          var data1 = {
            'title': title,
            'raw': desc,
            "category": Number(req.body.category),
            // 'target_recipients': det.user.username,
            'archetype': 'regular'
          };
        }
        else{
          var data1 = {
            'title': title,
            'raw': desc,
            // “category”: Number(category),
            'target_recipients': user_search,
            'archetype': 'private_message'
          };
        }
        console.log(data1);

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
              res.send(body);
              //res.redirect('/chat');
            });
          } else {
            res.redirect('/chat');
          }
        });
        request.write(querystring.stringify(data1));
        request.end();
  //     });
  //   } else {
  //     res.redirect('/chat');
  //   }
  // });
}


function reply_pvt(req,res){
  var url = secrets.url + '/posts.json';
  var curr_user=req.session.user.username;
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user
    }
  };
  var opt={
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(secrets.url+'t/'+req.body.slug+'/'+req.body.tid+'.json',opt,(response)=>{
  //  console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
        data=JSON.parse(data);

        var users_list=data.details.participants;
        uname_str='';
        for(var i=0;i<users_list.length;i++){
          if(users_list[i].username!==curr_user){
          if(i!==users_list.length-1){
            uname_str+=users_list[i].username+', ';
          }else{
            uname_str+=users_list[i].username;
          }
          }
        }

        var data1={
          "topic_id": Number(req.body.tid),
          "raw": req.body.body,
        "target_recipients":uname_str,
          "archetype": "regular",
        };

        var request=https.request(url,options,(response)=>{
          var body='';
          // console.log(response.statusCode);
          // console.log(response.statusMessage);
          if(response.statusCode===200){
            response.on('data',(chunk)=>{
              body+=chunk;
            });
            response.on('end',()=>{
              body=JSON.parse(body);
              //console.log(body);
            });
          }
        });
        request.write(querystring.stringify(data1));
        request.end();
        res.json({tid:req.body.tid,tslug:req.body.slug});
      });
    }else{
        res.redirect('/chat');
    }
  });
}


function reply_to_specific_pvt_msg(req,res){
  var topic_id = req.params.topic_id;
  var tid = req.body.tid;
  var category_id = req.params.category_id;
  var raw = (req.body.raw != undefined && req.body.raw != null ) ? req.body.raw: req.body.body;
  var original_raw = raw;
  // console.log(original_raw);
  var reply_to_post_number = req.params.post_number
  var URL = secrets.url + '/posts.json';

  var reg = /(^<p>|<\/p>$)/gi;
  var reg_for_base64 = /^data:.*\/.+;base64,/g;

  raw = raw.replace(reg, '');
  var result = raw.match(/<img.*?src="(.*?)"[^\>]*>/gi);
  // console.log(result[0].match(/src="(.*?)"/));
  if(result && result.length>0){

    var bas64_encoded = result[0].match(/src="(.*?)"/)[1].replace(reg_for_base64,"");
    var extension = result[0].match(/src="(.*?)"/)[1].match(reg_for_base64);
    // console.log(extension);
    // console.log(extension[0].match(/\/(.+);/)[1]);

    url = secrets.url + '/uploads.json';

    // console.log(raw.split('<img src="'));
    // console.log(url);

    // let bufferObj = Buffer.from(raw.split('<img src="')[1].slice(0, -2).replace("data:image/png;base64,",""), "base64"); 
    let bufferObj = Buffer.from(bas64_encoded, "base64"); 
      
    // Encode the Buffer as a utf8 string 
    let decodedString = bufferObj.toString("utf8");

    const form = new FormData();
    form.append('files[]', bufferObj,"new."+extension[0].match(/\/(.+);/)[1]);
    form.append('type','composer');
    // console.log(form);

    fetch(url, {
      method: 'POST',
      body: form,
      headers: {
        'Api-Key': secrets.key,
        'Api-Username': req.session.user.username,
      },
    })
    .then(response => response.json())
    .then(data => {
      // console.log("data");
      // console.log(data);
      original_raw = original_raw.replace(reg, '');
      if(data.extension == "png" || data.extension == "jpeg" || data.extension == "jpg" || data.extension == "gif" || data.extension == "svg"){
        // img_tag = '<img src="'+ secrets.url+data.url +'" height="'+ data.height +'" width="'+ data.width +'" />'
        no_tag = "!["+data.original_filename+"|"+data.thumbnail_width+"*"+data.thumbnail_height+"]("+secrets.url+data.url+")"
        original_raw = original_raw.replace(/<img.*?src="(.*?)"[^\>]*>/gi,no_tag)
      }
      else{
        // no_tag = secrets.url+data.url
        no_tag = "["+data.original_filename+"|attachment]("+data.url+") ("+data.human_filesize+")"
        original_raw = original_raw.replace(/<img.*?src="(.*?)"[^\>]*>/gi,no_tag)
      }
      // original_raw = "[new1.pdf|attachment](https://t2.metastudio.org/uploads/default/original/2X/a/a629c0bcccb48138805c714b7e068b1bd90143fc.pdf) (6.2 KB)"
      // console.log(original_raw);
      reply(original_raw)
      // res.send(original_raw);
    })
    .catch(error => {
      console.error("error");
      console.error(error);
    })

  }
  else{
    // console.log("else -");
    reply(original_raw);
  }

  function reply(original_raw){
    // console.log("reply");
    var options = {
      method: "POST",
      headers: {
        'Api-Key': secrets.key,
        'Api-Username': req.session.user.username,
        // 'Content-Type': 'multipart/form-data',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    if (reply_to_post_number!= null && reply_to_post_number!=undefined){
      var data1 = {
        "topic_id": topic_id,
        "raw": original_raw,
        // "category": Number(category_id),
        "archetype": "regular",
        "reply_to_post_number": reply_to_post_number
      };
    }
    else{
      var data1 = {
        "topic_id": tid,
        "raw": original_raw,
        "archetype": "regular"
      };
    }

    // console.log(data1);
    // console.log(options);
    
    var request = https.request(URL, options, (response) => {
       //  console.log(response.statusMessage);
       // console.log(response.statusCode);
      if (response.statusCode === 200) {
        var body = '';
        response.on('data', (data) => {
          body += data;
        });
        response.on('end', () => {
          body = JSON.parse(body);
          // console.log(body);
          // res.redirect('/post/t/' + body.topic_slug + '/' + body.topic_id +'/'+(Number(reply_to_post_number)+1));
        });
      } else {
        // res.redirect('/');
      }
    });
    request.write(querystring.stringify(data1));
    request.end();
    res.send(original_raw);
    }
  
}

function delete_posts(req,res){
  var data1={}
  var options = {
    method: "DELETE",
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': req.session.user.username
    }
  };
  var url = secrets.url + '/'+req.params.type+'/'+req.params.id;
  var request = https.request(url, options, (response) => {
     // console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        res.send("success");
      });
    } else {
      res.redirect('/');
    }
  });
  request.write(querystring.stringify(data1));
  request.end();
}

function upload_file(req, res){


    url = secrets.url + '/uploads.json';

    let bufferObj = Buffer.from(req.body.file, "base64");

    let decodedString = bufferObj.toString("utf8");

    const form = new FormData();
    form.append('files[]', bufferObj, req.body.filename);
    form.append('type','composer');

    fetch(url, {
      method: 'POST',
      body: form,
      // enctype: 'multipart/form-data',
      headers: {
        'Api-Key': secrets.key,
        'Api-Username': req.session.user.username,
      },
    })
    .then(response => response.json())
    .then(data => {
      // console.log("data");
      // console.log(data);
      if(data && data.extension == "png" || data.extension == "jpeg" || data.extension == "jpg" || data.extension == "gif" || data.extension == "svg"){
        no_tag = "!["+data.original_filename+"|"+data.thumbnail_width+"*"+data.thumbnail_height+"]("+secrets.url+data.url+")"
        res.send(no_tag);
      }
      else if (data.original_filename!=undefined && data.url != undefined) {
        no_tag = "["+data.original_filename+"|attachment]("+data.url+") ("+data.human_filesize+")"
        res.send(no_tag);
      }
      else{
        res.send({"error":"File is not uploaded"});
      }
    })
    .catch(error => {
      console.error("error in uploading");
      console.error(error);
    })

}

function get_topic(req, res, home, about, blog, project, feedback, logout, profile, curr_user){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };
  // console.log(req.params);
  // console.log(req.query);
  // console.log(secrets.url+'t/'+req.params.topic_slug+'/'+req.params.topic_id+'.json');
  if (req.params.post_number != "0" && req.params.post_number != null && req.params.post_number != undefined ){
    post_number = req.params.post_number;
  }
  else{
    post_number = "99999";
  }
  // console.log(secrets.url+'t/'+req.params.topic_slug+'/'+req.params.topic_id+'/'+post_number+'.json')
  https.get(secrets.url+'t/'+req.params.topic_slug+'/'+req.params.topic_id+'/'+post_number+'.json',options,(response)=>{
   // console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
        // console.log("data----");
        // console.log(data);
        // var data = {"title":" kks ls a sas"}
        data = JSON.parse(data);
        // console.log(data.posts_count);
        if (req.params && req.params.post_number){
        page_number = Number(req.params.post_number) / 20;
        page_number = Math.ceil(page_number);
        }
        else{
        page_number = Number(data.posts_count) / 20;
        page_number = Math.floor(page_number);
        page_number = page_number + 1;
        }
        // console.log(page_number);
        let page_url = "topic";
        res.render('home.ejs', {
          home: home, about: about, blog: blog, project: project, feedback: feedback, logout: logout, profile: profile, curr_user: curr_user,url:secrets.url, topic_data: data, page_url: page_url, page_number:page_number
        });
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });
}

function get_categories(req, res, home, about, blog, project, feedback, logout, profile, curr_user){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };

  https.get(secrets.url+'categories.json',options,(response)=>{
   console.log(response.statusCode);
    if(response.statusCode===200 || response.statusCode===404){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
        console.log("data");
        // console.log(data);
        let page_url = "categories";
        res.render('home.ejs', {
          home: home, about: about, blog: blog, project: project, feedback: feedback, logout: logout, profile: profile, curr_user: curr_user,url:secrets.url, page_url:page_url
        });
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });

}

function get_sub_category(req, res){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };
  // console.log(req.params);
  // console.log(req.query);

  // console.log(secrets.url+'c/'+req.params.category_slug_or_id+'/'+req.params.sub_category_slug_or_id+'.json');
  https.get(secrets.url+'c/'+req.params.category_slug_or_id+'/'+req.params.sub_category_slug_or_id+'.json',options,(response)=>{
   // console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
        // console.log("data");
        // console.log(data);
        // let page_url = "sub_categories";
         res.send(JSON.parse(data));
        
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });

}

function get_topics(req, res){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };

  https.get(secrets.url+'c/'+req.params.category_slug_or_id+'/'+req.params.sub_category_slug_or_id+'.json?page='+req.params.page_number,options,(response)=>{
   console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
         res.send(JSON.parse(data));        
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });
}

function get_specific_posts(req, res,home, about, blog, project, feedback, logout, profile, curr_user){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };
  var url = secrets.url+'t/'+req.params.topic_slug+'/'+req.params.topic_id;
  let specific_posts_page = "false";
  if (req.params.page_number!="" && req.params.page_number != null && req.params.page_number != undefined){
    url= url +'.json?page='+req.params.page_number
  }
  else if (req.params.post_number!="" && req.params.post_number != null && req.params.post_number != undefined){
    specific_posts_page = "true";
    url = url+"/"+ req.params.post_number + ".json"
  }
  else{
    url = url+ ".json"
  }

  https.get(url,options,(response)=>{
   // console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
         // res.send(JSON.parse(data));
        data = JSON.parse(data);
        post_number = req.params.post_number
        let page_url = "topic";
        res.render('home.ejs', {
          home: home, about: about, blog: blog, project: project, feedback: feedback, logout: logout, profile: profile, curr_user: curr_user, url:secrets.url, topic_data: data, page_url: page_url, post_number:post_number,specific_posts_page:specific_posts_page
        });      
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });
}

function get_posts_using_post_ids(req, res){
  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };
  post_ids = ""
  for (let i = 0; i < req.query.post_ids.length; i++){
    if( i == (req.query.post_ids.length-1))
    {
      post_ids = post_ids + 'post_ids[]='+req.query.post_ids[i]+''
    }
    else{
      post_ids = post_ids + 'post_ids[]='+req.query.post_ids[i]+'&'
    }
  }
  
  if (post_ids !=null && post_ids != undefined){
  var url = secrets.url+'t/'+req.params.topic_id+"/posts.json?"+post_ids;
  // console.log(url);
  https.get(url,options,(response)=>{
   // console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
         res.send(JSON.parse(data));

      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });
  }
}

function get_post_replies(req, res){

  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };

  var url = secrets.url+'posts/'+req.params.post_id+"/replies.json"
  // console.log(url);
  https.get(url,options,(response)=>{
   // console.log(response.statusCode);
    if(response.statusCode===200){
      var data='';
      response.on('data',(chunk)=>{
        data+=chunk;
      });
      response.on('end',()=>{
         res.send(JSON.parse(data));
      });
      response.on('error', function() {
        console.log('error');
      });
    }
  });

}

function like(req, res){
  var curr_user=req.session.user;
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username
    }
  };

  var data1 = {
    "id": req.params.post_id,
    "post_action_type_id": 2,
    "flag_topic" :false
  };

  var url = secrets.url + '/post_actions'
  var request = https.request(url, options, (response) => {
     // console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        res.send("success");
      });
    } else {
      res.redirect('/');
    }
  });
  request.write(querystring.stringify(data1));
  request.end();
}

function advanced_search(req, res) {
  var url = secrets.url + "/search/query.json?term="+req.query.search_text+"&include_blurbs=true&type_filter=user"
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(url, options, function(response) {
    var body = '';
    //  console.log(response.statusCode);
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      body = JSON.parse(body);
      res.send(body);
    });
  }).on('error', function() {
    console.log('error');
    res.redirect('/');
  });
}

function search_topics_and_posts(req, res) {
  var url = secrets.url + "/search.json?q="+req.query.search_text
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  https.get(url, options, function(response) {
    var body = '';
    //  console.log(response.statusCode);
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      body = JSON.parse(body);
      res.send(body);
    });
  }).on('error', function() {
    console.log('error');
    res.redirect('/');
  });
}

function get_specific_post_replies(req, res) {
  var url = secrets.url + "/posts/"+req.params.post_id+"/reply-history.json?max_replies=1"
  // var url = secrets.url + "/posts/"+  +"/reply-history.json?max_replies=1"
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': 'system'
    }
  };
  // console.log(url);
  https.get(url, options, function(response) {
    var body = '';
    //  console.log(response.statusCode);
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      // console.log(body)
      try {
        body = JSON.parse(body);
      } catch (ex) {
      console.log(body);
      }

      res.send(body);
    });
  }).on('error', function() {
    console.log('error');
    res.redirect('/');
  });
}

function unlike(req, res){
  var curr_user=req.session.user;
  var options = {
    method: 'DELETE',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username,
      // 'Content-Type': 'multipart/form-data',
    }
  };

  var data1 = {
    // "id": req.params.post_id,
    "post_action_type_id": 2,
    // "flag_topic" :false
  };
  // console.log(req.params.post_id);
  // console.log(data1);
  // console.log(options);
  var url = secrets.url + '/post_actions/'+ req.params.post_id
  // console.log(url);
  // var request = https.request(url, options, (response) => {
  //    console.log(response.statusCode);
  //   if (response.statusCode === 200) {
  //     var body = '';
  //     response.on('data', (data) => {
  //       body += data;
  //     });
  //     response.on('end', () => {
  //       res.send("success");
  //     });
  //   } else {
  //     res.redirect('/');
  //   }
  // });
  // request.write(querystring.stringify(data1));
  // request.end();
    const formData = new FormData();
    formData.append('post_action_type_id', 2);
    fetch(url, {
      method: 'DELETE',
      body: formData,
      headers: {
        'Api-Key': secrets.key,
        'Api-Username': req.session.user.username,
      },
    })
    .then(response => response.json())
    .then(data => {
      res.send("success");
    });
}


function get_specific_post_by_id(req, res){
  var curr_user=req.session.user;
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username,
    }
  };

  var data1 = {
  };

  var url = secrets.url + '/posts/'+ req.params.post_id+".json"
  console.log(url);
  var request = https.request(url, options, (response) => {
     console.log(response.statusCode);
    if (response.statusCode === 200) {
      var body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        try {
          body = JSON.parse(body);
        } catch (ex) {
        console.log(body);
        }
        res.send(body);
      });
    } else {
      res.redirect('/');
    }
  });
  request.write(querystring.stringify(data1));
  request.end();
}

function update_posts_raw_by_id(req, res){
  var curr_user=req.session.user;
  var options = {
    method: 'PUT',
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': curr_user.username,
    }
  };

  // var data1 = {
  //   post[topic_id]: req.query.topic_id,
  //   post[raw]: req.query.raw,
  //   post[raw_old]: req.query.raw_old,
  // };

  var url = secrets.url + '/posts/'+ req.params.post_id+".json"
  console.log(url);
  // var request = https.request(url, options, (response) => {
  //    console.log(response.statusCode);
  //   if (response.statusCode === 200) {
  //     var body = '';
  //     response.on('data', (data) => {
  //       body += data;
  //     });
  //     response.on('end', () => {
  //       try {
  //         body = JSON.parse(body);
  //       } catch (ex) {
  //       console.log(body);
  //       }
  //       res.send(body);
  //     });
  //   } else {
  //     res.redirect('/');
  //   }
  // });
  // request.write(querystring.stringify(data1));
  // request.end();
  // console.log(req.body.topic_id);
  // console.log(req.body.raw);
  // console.log(req.body.raw_old);
  const formData = new FormData();
  formData.append('post[topic_id]', req.body.topic_id);
  formData.append('post[raw]', req.body.raw);
  formData.append('post[raw_old]', req.body.raw_old);
  // console.log(formData);
  fetch(url, {
    method: 'PUT',
    body: formData,
    headers: {
      'Api-Key': secrets.key,
      'Api-Username': req.session.user.username,
    },
  })
  .then(response => response.json())
  .then(data => {
    res.send(data);
  });
}