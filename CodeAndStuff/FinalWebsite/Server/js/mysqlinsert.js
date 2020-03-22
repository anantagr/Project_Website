const mysql = require("mysql");
const express = require("express");
const path = require("path");

module.exports = (myrequest, myresponse)=>{ 

	var data = [];
	console.log(myrequest.body);
	data[0] = myrequest.body.email;
	data[1] = myrequest.body.password;
	data[2] = myrequest.body.secondPassword;
	
	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "TravelExperts"
	});

	conn.connect((err)=>{
		if (err) throw err;
		var sql = "INSERT INTO `signup`(`email`," + "`password`," + "`secondPassword`) "
			+ "VALUES (?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	myresponse.redirect("/thanks.html");
}