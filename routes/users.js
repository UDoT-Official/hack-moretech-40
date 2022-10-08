var express = require('express');
var app = express.Router();

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
app.get('/register', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = app;
