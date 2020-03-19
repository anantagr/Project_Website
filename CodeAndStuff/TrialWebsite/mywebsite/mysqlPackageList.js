//This page will open all the packages available

const express = require("express");
const path = require('path');
const mysql = require("mysql");
const fs = require("fs");
const app = express();
app.use(express.static(path.join(__dirname,"public")));
app.listen(8000);


app.get("/packages", (myrequest, myresponse)=>{ 

  const conn = mysql.createConnection({     
      host:"localhost",                       
      user:"root",
      password:"",
      database:"travelexperts"
  });

  conn.connect((err)=>{
    if (err) throw err;
    var sql_string = "SELECT * FROM packages"; 
    conn.query(sql_string, (err, result, fields)=>{ 
        if(err) throw err;
        console.log("Result: " + result);
        console.log("Fields: " + fields);
        myresponse.writeHead(200, {"Content-type":"text/HTML"});

        fs.readFile("mysqlselect_header.html", (err, data)=>{
          if (err) throw err;
          myresponse.write(data);
                
          myresponse.write("<table border='1'>");

          myresponse.write("<tr>"); 
          for (column of fields)
            {
              myresponse.write("<th>" + column.name + "</th>")
            }
            for(packages of result)
              {
                myresponse.write("<tr>")
                var value = Object.values(packages) 
                for (i=0; i < value.length; i++)
                  {
                    myresponse.write("<td>" + value[i] + "</td>")
                  }
                myresponse.write("</tr>");
              }
                        
          myresponse.write("</table>");
        
        
          fs.readFile("mysqlselect_footer.html", (err, data)=>{
          if (err) throw err;
          myresponse.write(data);
          myresponse.end();
          });
        });
      });
    
    conn.end((err)=>{
      if (err) throw err;
    });
  }); 
});