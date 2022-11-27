require("dotenv").config();
require("./backend/data/db"); 
require("./backend/utilities/debugUtil");

const path = require("path");
const express = require("express");
const app = express();  
const routes = require("./backend/routes/index");
  
app.use(express.json());
app.use(express.urlencoded({extended : true}));
 
app.use(function (req, res, next){ 
  debugLog(req.method, req.url); 
  next();
}); 
  

app.use((req, res, next) => {  
  // res.header('Access-Control-Allow-Origin');
  // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  // res.header('Access-Control-Allow-Headers: Preflight, Origin, Content-Type, X-Auth-Token');

  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Preflight, Authorization, X-Token"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  
  next();
});
 
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));

app.use(routes); 

const server = app.listen(process.env.SERVER_PORT, function(){
    console.info(process.env.SERVER_MESSAGE_ESTABLISH + server.address().port);
});