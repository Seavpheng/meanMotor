const express = require("express");
const manufactureRoute = require("./manufacture"); 
const manufactureController = require("../controllers/manufacture.controller");
const userRoute = require("./user.route");

const router = express.Router(); 

router.use(process.env.ROUTE_MANUFACTURE, manufactureRoute); 
  
router.use(process.env.ROUTE_USER, userRoute); 
 
module.exports = router;