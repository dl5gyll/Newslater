//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
//use body parsers
app.use(bodyParser.urlencoded({
  extended: true
}));

//running the images and styles sheet from the static page.
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res, body) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;


 var data = {
    members: [{
   email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    }
  }]
};

 var jsonData = JSON.stringify(data);


var options = {
  url: "https://us3.api.mailchimp.com/3.0/lists/617a52b917",
  method: "POST",
  headers: {
    "Authorization": "kevin1 1629d4a9aaf5552fde79071eff3978b0-us3"
  },
   body: jsonData
};

request(options, function(error, response, body) {
  if (error) {
    res.sendFile(__dirname + "/failure.html");
  } else {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
  }
});

});


app.post("/failure", function(req, res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

//mail chip api keys
// 1629d4a9aaf5552fde79071eff3978b0-us3

// Audience ID
// 617a52b917
