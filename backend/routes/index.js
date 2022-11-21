const express = require("express");
const manufactureRoute = require("./manufacture"); 
const manufactureController = require("../controllers/manufacture.controller");
const userRoute = require("./user.route");

const router = express.Router(); 

router.use("/manufactures", manufactureRoute); 




router.use("/users", userRoute); 
 
module.exports = router;