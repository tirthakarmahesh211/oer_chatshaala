const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log("hi");
  


});

app.post("/login", function (req, res) {
    console.log("hilog");
});
app.post("/signup", function (req, res) {
    console.log("hisign");
});



app.listen(3000, function () {
    console.log("Started 3000 Ps");
});