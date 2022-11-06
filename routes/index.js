const express = require("express");
const manufactureController = require("../controllers/manufacture.controller");
const motorbikeController = require("../controllers/motorbike.controller");

const router = express.Router();

// router.route("/").get(function(req, res){
//     res.status(process.env.RESPONSE_CODE_OK);
// });


router.route("/manufactures")
    .get(manufactureController.getAll)
    .post(manufactureController.addOne);

router.route("/manufactures/:manufactureId")
    .get(manufactureController.getOne)
    .put(manufactureController.updateOne)
    .delete(manufactureController.deleteOne);

router.route("/manufactures/:manufactureId/motorbikes")
    .get(motorbikeController.getAll)
    .post(motorbikeController.addOne);

router.route("/manufactures/:manufactureId/motorbikes/:motorbikeId")
    .get(motorbikeController.getOne)
    .put(motorbikeController.updateOne)
    .delete(motorbikeController.deleteOne);


 
module.exports = router;