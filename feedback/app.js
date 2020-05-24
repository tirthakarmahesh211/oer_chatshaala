const express = require('express');
const app = express();
const ejs = require("ejs");
const parser = require('body-parser');

app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/feedback",function(req,res){
    res.render("feedback")
});

app.post("/feedback",function(req,res){
  console.log(req.body.ratings+" "+req.body.options+" "+req.body.topic+" "+req.body.desc+" ");
  var type=req.body.options;
  var topic=req.body.topic;
  var desc=req.body.desc;
  var rate=req.body.ratings;
 // console.log(req.body);
  res.send(type+" "+topic+" "+desc+" "+rate);
  //res.send(req.body.topic+" "+req.body.desc+" "+res.body.options);
});





app.listen(3000, function(req, res) {
  console.log('Server Started');
});
