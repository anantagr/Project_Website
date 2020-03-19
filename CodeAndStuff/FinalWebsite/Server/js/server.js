var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path=require('path');

var packages = require('./mysqlPackageList')

app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, '/')));

app.get("/packages", packages);

//app.get("/contacts", contacts);


app.listen(5000, function() {
  console.log('Server running at http://127.0.0.1:5500/');
});