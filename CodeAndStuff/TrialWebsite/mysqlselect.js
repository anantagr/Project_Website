const mysql = require("mysql");
const express = require("express")
const fs = require("fs");
const app = express();
app.listen(8000);

app.get("/cinfo", (myrequest, myresponse)=>{ 

  const conn = mysql.createConnection({     
      host:"localhost",                       
      user:"root",
      password:"",
      database:"TravelExperts"
  });

  conn.connect((err)=>{
    if (err) throw err;
    var sql_string = "SELECT * FROM customers WHERE CustomerID = ?";
    var data = [ "106" ];
    conn.query(sql_string, data, (err, result, fields)=>{ 
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
            for(cusinfo of result)
              {
                myresponse.write("<tr>")
                var value = Object.values(cusinfo) 
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