const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


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
	data[0] = req.body.fname;
	data[1] = req.body.lname;
	data[2] = req.body.email;
	data[3] = req.body.contactnumber;

	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "NewTravelExperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `CustomerContactDetails`(`fname`, `lname`,"
			+ " `email`, `contactnumber`) "
			+ "VALUES (?,?,?,?)";
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
