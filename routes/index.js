var express = require('express');
var app = express.Router();
var path = require('path');

const apiUrl = 'https://hackathon.lsp.team/hk'
  appHk = express(),
  request = require('request')

const fs = require('fs');
const { dirname } = require('path');
const urlencodedParser = express.urlencoded({extended: true});
app.use('/public/static', express.static('static'));


var data = require('../bin/data/users.json')

/* POST home page. */
app.post('/', urlencodedParser, function(req, res) {  
  console.log(data)
  console.log(data['users'])
  console.log(data['users']['admin@vtb.ru'])
  console.log(req.body.user_login)

  if(data['users'][req.body.user_login] != undefined && data['users'][req.body.user_login]['password'] == req.body.user_password){
    res
      .status(12)
      .cookie('access_token', {'rank' : 'admin', 'login' :  req.body.user_login,'id' : data['users'][req.body.user_login]['id']})
      .redirect('/static/profile.html')
      
  }
  else{
    res.send("WRONG LOGIN")
  }
});

app.post('/static/profile.html', urlencodedParser, function(req, res){
  console.log(req.cookies);

  var idFromClient = req.cookies['access_token']['id']
  console.log("I CAN SAND TOKE")

  res
      .send("Yea boy");
})

// return 
// {
// 	"maticAmount": 0.27,
// 	"coinsAmount": 547.34
// }
app.get('/static/profile.html/transaction/balance', urlencodedParser, function(req, res){
  console.log(req.cookies)
  console.log(data)
  console.log(apiUrl+`/v1/wallets/${data['users'][req.cookies['access_token']['login']]['wallet']['public_key']}/balance`)
  
  var a = JSON
      request(
      apiUrl+`/v1/wallets/${data['users'][req.cookies['access_token']['login']]['wallet']['public_key']}/balance`,
      (err, response, body) => {
        if (err) return res.status(500).send({ message: err })
          a = body;
          console.log(a);
      })
    
  

  console.log(a);
  res
    .cookie('balance', a)
    .redirect('/static/profile.html')
})

app.get('/static/profile.html/transaction/newWallet', urlencodedParser, function(req, res){
  
})

// I need JSON in format {"PrivateKeyUr" : str, "PublicKeyHis" : str, "amount" : int} 
app.post('/static/profile.html/transaction/send', urlencodedParser, function(req, res){
  
})

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
