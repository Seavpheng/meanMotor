const express = require("express"); 
const userController = require("../controllers/user.controller");

const router = express.Router();
 
router.route(process.env.ROUTE_USER_REGISTER).post(userController.register);
router.route(process.env.ROUTE_USER_LOGIN).post(userController.login);
 
module.exports = router;