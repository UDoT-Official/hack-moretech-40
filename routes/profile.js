var express = require('express');
var app = express.Router();
var path = require('path');

const fs = require('fs');
const { dirname } = require('path');
const urlencodedParser = express.urlencoded({extended: true});
app.use('/public/static', express.static('static'));





module.exports = app;