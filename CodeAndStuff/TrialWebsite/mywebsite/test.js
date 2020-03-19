var express = require('express');
var app = express();

app.use(express.static('public'))

var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host:"localhost",                       
  user:"root",
  password:"",
  database:"travelexperts"
});        

app.get('/packages.html', function (req, res) {
  connection.connect();  

  connection.query('SELECT * FROM packages', function(err, rows, fields)   
  {  
      connection.end();

      if (err) throw err;  

      res.json(rows); 

  });
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});