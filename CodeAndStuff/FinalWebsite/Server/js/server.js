var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path=require('path');

var packages = require('./mysqlPackageList')
var contacts = require('./mysqlContacts')
var signup = require('./mysqlinsert')


app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, '../')));

app.get("/packages", packages);
app.get("/contacts", contacts);

app.use(express.static(path.join(__dirname, '../../Client')));
app.post("/post_form", signup)

app.listen(5000, function() {
  console.log('Server running at http://127.0.0.1:5000/');
});