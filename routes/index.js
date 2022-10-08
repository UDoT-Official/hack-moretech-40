var express = require('express');
var app = express.Router();
var path = require('path');
const fs = require('fs');
const { dirname } = require('path');
const urlencodedParser = express.urlencoded({extended: true});

var loginFromServer = require('../bin/data/users.json')

/* GET home page. */
app.post('/', urlencodedParser, function(req, res) {

  data = loginFromServer
  
  console.log(data)
  console.log(data['users'])
  console.log(data['users']['admin@vtb.ru'])
  console.log(req.body.user_login)

  if(data['users'][req.body.user_login] != undefined && data['users'][req.body.user_login]['password'] == req.body.user_password){
    res
      .status(12)
      .cookie('access_token', {'rank' : 'admin', 'id' : data['users'][req.body.user_login]['id']})
      .redirect('profile.html')
  }
  else{
    res.send("WRONG LOGIN")
  }
});

/* GET home page. */
app.get('/market', function(req, res, next) {
  res.send('MARKET');
});

app.get('/lk', function(req, res, next){
  res.send("THIS IS LK");
})


app.get('/register', function(req, res, next) {
  //res.render('sindex', '/static/register.html')
  res.redirect('/static/register.html')
});


module.exports = app;
