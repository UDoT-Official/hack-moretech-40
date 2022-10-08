var express = require('express');
var app = express.Router();
/*
  This 
*/

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
