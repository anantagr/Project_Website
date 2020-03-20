var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path=require('path');

var packages = require('./mysqlPackageListTrialCopy-1')
//var contacts = require('./mywebsite/test')
var contacts = require('./mysqlAgencyContactsTrialCopy-1')
//var contacts = require('./mysqlAgentContacts')

app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, './mywebsite/')));
//app.post('/myaction.html', function(req, res) {
//  res.send('You sent the name "' + req.body.name + '".');
//});

app.get("/packages", packages);
app.get("/contacts", contacts);


app.listen(5000, function() {
  console.log('Server running at http://127.0.0.1:5000/');
});