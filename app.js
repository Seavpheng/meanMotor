require("dotenv").config();
require("./data/db");

const path = require("path");
const express = require("express");
const app = express(); 
const bodyParser = require('body-parser')

const routes = require("./routes");

app.use('/',function (req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)))
app.use( express.json());
app.use(express.urlencoded({extended : true}));
app.use(routes); 

const server = app.listen(process.env.SERVER_PORT, function(){
    console.info(process.env.SERVER_MESSAGE_ESTABLISH + server.address().port);
});