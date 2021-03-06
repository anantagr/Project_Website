//This page will open all the packages available

const mysql = require("mysql");
const express = require("express")
const fs = require("fs");
//const app = express();
//app.listen(5500);

//app.get("/packages", 
module.exports = (myrequest, myresponse)=>{ 

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
        myresponse.writeHead(200, {"Content-type":"text/HTML"});

        fs.readFile("mysqlselect_header.html", (err, data)=>{
          if (err) throw err;
          myresponse.write(data); //display the data  written in html file

          //Starting table with border = 1
          myresponse.write("<table border='1'>");

          myresponse.write("<tr>"); //Defining a table row
          
          //Starting table column headings
          for (column of fields)  //Alloting Row hearder to column
            {
              myresponse.write("<th>" + column.name + "</th>") //printing column names as table headers (th)
              //console.log(column.name);

            }
            
            //Starting table data
            for(packages of result)   // Alloting complete row data to packages 
              {
                myresponse.write("<tr>")  //Adding a new table row for each row entry
                var value = Object.values(packages) //Making an array 'value' to store 'package' data
                for (i=0; i < value.length; i++)
                  {
                    
                    myresponse.write("<td>" + value[i] + "</td>") //passing data in each row to table
                  }

                myresponse.write("</tr>"); // ending table row
              }   //going back for next row data
          
          //Ending Table
          myresponse.write("</table>");

        
          fs.readFile("mysqlselect_footer.html", (err, data)=>{
          if (err) throw err;
          myresponse.write(data); //display the data  written in html file
          myresponse.end(); //Stopping the http server
          });
        });
      });
    
    conn.end((err)=>{
      if (err) throw err;
    });
  }); 
}
//);