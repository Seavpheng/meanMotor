const express = require("express");
const manufactureController = require("../controllers/manufacture.controller");
const motorbikeController = require("../controllers/motorbike.controller");
const authController = require('../controllers/authentication.controller');

const router = express.Router();
   
router.route('/')
    .get(manufactureController.getAll)
    .post(authController.authenticated, manufactureController.addOne);

router.route(process.env.ROUTE_MANUFACTURE_PARAM_ID)
    .get( manufactureController.getOne) 
    .put(authController.authenticated, manufactureController.updateOne)
    .patch(authController.authenticated, manufactureController.updatePartial)
    .delete(authController.authenticated, manufactureController.deleteOne);

router.route(process.env.ROUTE_MOTORBIKE)
    .get(motorbikeController.getAll)
    .post(authController.authenticated, motorbikeController.addOne);

router.route(process.env.ROUTE_MOTORBIKE_PARAM_ID)
    .get(motorbikeController.getOne)
    .put(motorbikeController.updateOne)
    .delete(motorbikeController.deleteOne);

 
module.exports = router;