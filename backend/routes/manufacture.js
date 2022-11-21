const express = require("express");
const manufactureController = require("../controllers/manufacture.controller");
const motorbikeController = require("../controllers/motorbike.controller");
const authController = require('../controllers/authentication.controller');

const router = express.Router();
   
router.route('/')
    .get(manufactureController.getAll)
    .post(manufactureController.addOne);

router.route("/:manufactureId")
    .get(authController.authenticated, manufactureController.getOne)
    .put(manufactureController.updateOne)
    .patch(manufactureController.updatePartial)
    .delete(manufactureController.deleteOne);

router.route("/:manufactureId/motorbikes")
    .get(motorbikeController.getAll)
    .post(motorbikeController.addOne);

router.route("/:manufactureId/motorbikes/:motorbikeId")
    .get(motorbikeController.getOne)
    .put(motorbikeController.updateOne)
    .delete(motorbikeController.deleteOne);

 
module.exports = router;