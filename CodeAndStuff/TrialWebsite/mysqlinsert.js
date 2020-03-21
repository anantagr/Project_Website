const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

//module.exports = (myrequest, myresponse)=>{ 

var data = [];
const app = express();
app.listen(8000, err=>{
	if (err) throw err;
	console.log("server started");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "mywebsite")));

app.post("/post_form", (req, res)=>{
	console.log(req.body);
	data[0] = req.body.email;
	data[1] = req.body.passowrd;
	data[2] = req.body.secondPassword;
	//data[3] = req.body.contactnumber;

	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "TravelExperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustEmail`, `password`, `secondPassword`"
			+ "VALUES (?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.redirect("/thanks.html");
});
