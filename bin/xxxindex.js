const express = require("express");
const manufactureController = require("../backend/controllers/manufacture.controller");
const motorbikeController = require("../backend/controllers/motorbike.controller");
const userController = require("../backend/controllers/user.controller");

const router = express.Router();
 
router.route("/manufactures")
    .get(manufactureController.getAll)
    .post(manufactureController.addOne);

router.route("/manufactures/:manufactureId")
    .get(manufactureController.getOne)
    .put(manufactureController.updateOne)
    .patch(manufactureController.updatePartial)
    .delete(manufactureController.deleteOne);

router.route("/manufactures/:manufactureId/motorbikes")
    .get(motorbikeController.getAll)
    .post(motorbikeController.addOne);

router.route("/manufactures/:manufactureId/motorbikes/:motorbikeId")
    .get(motorbikeController.getOne)
    .put(motorbikeController.updateOne)
    .delete(motorbikeController.deleteOne);


router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login);


 
module.exports = router;