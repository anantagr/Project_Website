//This page will display all the packages available in cmd comsol

const mysql = require("mysql");
const express = require("express")
const fs = require("fs");
const app = express();
app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/packages');
});

app.get("/packages", (myrequest, myresponse)=>{ 

  const conn = mysql.createConnection({     
      host:"localhost",                       
      user:"root",
      password:"",
      database:"travelexperts"
  });

  conn.connect((err)=>{
    if (err) throw err;
    console.log("Connected to Travel Expert Database");
    var sql_string = "SELECT * FROM packages";
    console.log("Packages table selected");

    conn.query(sql_string, (err, result, fields)=>{ // Storing table data in results and table heading in fields
        if(err) throw err;
          
          for (column of fields)
            {
              console.log(column.name);
            }

          for(packages of result)
            {
              var value = Object.values(packages) //Making an array 'value' to store 'package' data
              for (i=0; i < value.length; i++)
                {
                  console.log(value[i]) //passing data in each row to table
                }
            }

          myresponse.end(); //Stopping the http server
          });
          conn.end((err)=>{
          if (err) throw err;
        });
      });
    

    });