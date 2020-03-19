var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path=require('path');

app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, '/')));
app.post('/myaction.html', function(req, res) {
  res.send('You sent the name "' + req.body.name + '".');
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});