const mysql = require("mysql");

var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});

conn.connect((err)=>{
	if (err) throw err;
	console.log("Connected");
	conn.query("create database NewTravelExperts", (err, result)=>{
		if (err) throw err;
		console.log("result: ", result);
		console.log("Database was created");
		conn.end(err=>{ 
			if (err) throw err;
			console.log("connection ended");
		});
	});
});