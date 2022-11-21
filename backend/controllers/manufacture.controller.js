const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);

function createManufacture(body) {
    manufacture = {
        name: body.name,
        establishedYear: body.establishedYear,
        motorbikes: []
    };
    return manufacture;
};

const getOne = function (req, res) {
    const manufactureId = req.params.manufactureId;

    if (!mongoose.isValidObjectId(manufactureId)) {
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT);
        return
    }

    // Manufacture.findById(manufactureId).exec(function(err, manufacture){
    //     const response ={status : process.env.RESPONSE_CODE_OK, message: [manufacture]};
    //     if(err){
    //         console.message(err.message);
    //         response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
    //         response.message = err.message;
    //     }  
    //     res.status(response.status).json(response.message); 
    // });

    const response = {
        status: parseInt(process.env.RESPONSE_CODE_OK),
        message: {}
    };

    Manufacture.findById(manufactureId).exec()
        .then((manufacture) => {
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufacture;
        })
        .catch((error) => {
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = error.message;
        })
        .finally(() => {
            res.status(response.status).json(response.message);
        }); 
}

const getAll = function (req, res) {
    console.log("getAll");


    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

    if (isNaN(offset) || isNaN(count)) {
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_NUMBER);
        return;
    }

    if (count > maxCount) {
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).send(process.env.RESPONSE_MESSAGE_EXCEED_LIMIT + count);
        return;
    }

    
    const response = {
        status: parseInt(process.env.RESPONSE_CODE_OK),
        message: {}
    };
    Manufacture.find().skip(offset).limit(count).exec()
        .then((manufactures) =>{
            response.status =parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufactures;
        })
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        }); 
}

const addOne = function (req, res) {
 
    newManufacture = {
        name: req.body.name,
        establishedYear: req.body.establishedYear,
        motorbikes: []
    };

    const response ={status: 200, message:{}};
  
    Manufacture.create(newManufacture)
        .then(manufacture=>{  
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufacture; 
        })
        .catch(error=>{
            console.log(error);
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
           
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        })

}

const deleteOne = function (req, res) {
    const manufactureId = req.params.manufactureId;

    if (!mongoose.isValidObjectId(manufactureId)) {
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT);
        return;
    }

    // Manufacture.findOneAndDelete(manufactureId).exec(function (err, deletedManufacture) {
    //     const response = { status: process.env.RESPONSE_CODE_OK, message: deletedManufacture };
    //     if (err) {
    //         console.error(err);
    //         response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
    //         response.message = err.message;
    //     } else if (!deletedManufacture) {
    //         console.log();
    //         response.status = process.env.RESPONSE_CODE_NOT_FOUND;
    //         response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
    //     }

    //     res.status(response.status).json(response.message);
    // });

    const response = {status :200, message :{}}
    Manufacture.findOneAndDelete(manufactureId).exec()
        .then(deletedManufacture=>{
            if(!deletedManufacture){
                response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            }else{
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = process.env.RESPONSE_MESSAGE_DELETE_SUCCESS;
            }
        })
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}


const _fullUpdate = function (req, res, manufacture) {
    manufacture.name = req.body.name;
    manufacture.establishedYear = req.body.establishedYear;

    // manufacture.save(function (err, updatedManufacture) {
    //     const response = { status: 204, message: updatedManufacture }
    //     if (err) {
    //         response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
    //         response.message = err.message;
    //     }
    //     res.status(response.status).json(response.message);
    // });

    const response = {status :200, message :{}}
    manufacture.save()
        .then(updatedManufacture=>{
            response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
            response.message = updatedManufacture;
        })
        .catch(error=>{
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}


const _partialUpdate = function (req, res, manufacture) {
    if (req.body.name != undefined) {
        manufacture.name = req.body.name;
    }
    if (req.body.establishedYear != undefined) {
        manufacture.establishedYear = req.body.establishedYear;
    }
    manufacture.save(function (err, updatedManufacture) {
        const response = { status: 204, message: updatedManufacture }
        if (err) {
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = err.message;
        }
        res.status(response.status).json(response.message);
    });
}


const isValidObjectId = function (manufactureId, res) {
    if (!mongoose.isValidObjectId(manufactureId)) {
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT);
        return false;
    }
    return true;
}
 
const checkNullError = function (res, error, manufacture) {
    if (error) {
        console.log("error");
        response(res, process.env.RESPONSE_CODE_SERVER_ERROR, error.message);
        return true;
    } else if (!manufacture) {
        console.log("!manufacture");
        response(res, process.env.RESPONSE_CODE_NOT_FOUND, process.env.RESPONSE_MESSAGE_NOT_FOUND);
        return true;
    }
    return false;
}

const _updateOne = function (req, res, callBackSave) {
    const manufactureId = req.params.manufactureId;
    if (isValidObjectId(manufactureId, res)) {
        return;
    } 

    const reponse ={status: 200, message:{}};
    
    Manufacture.findById(manufactureId).exec()
        .then(manufacture=>{
            if(!manufacture){
                reponse.status =parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            }else{
                callBackSave(req, res, manufacture);
            }
        })
        .catch(error =>{
            reponse.status =parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(reponse.message);
        }); 
    }

const updateOne = function (req, res) {
    _updateOne(req, res, _fullUpdate);
}

const updatePartial = function (req, res) {
    _updateOne(req, res, _partialUpdate);
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne,
    updatePartial: updatePartial
}