//This code is to add columns in existing table in MySQL DB

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "TravelExperts"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "ALTER TABLE Customers ADD Password VARCHAR(255)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("New column added successfully");
  });
});