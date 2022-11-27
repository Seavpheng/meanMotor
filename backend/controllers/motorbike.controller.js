const { response } = require("express");
const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);
require("../utilities/debugUtil");


const getAll = function(req, res){
    const manufactureId = req.params.manufactureId; 
    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    }   
    const response = {status :200, message :{}};

    Manufacture.findById(manufactureId).select(process.env.MOTORBIKE_COLLECTION).exec()
        .then(motorbikes=>{ 
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = motorbikes;
        })
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(reponse.status).json(response.message);
        }); 
}


const getOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    } 
    const motorbikeId = req.params.motorbikeId; 

    const response = {status :200, message :{}};

    Manufacture.findById(manufactureId).select(process.env.MOTORBIKE_COLLECTION).exec()
        .then(motorbikes=>{
            response.status = parsetInt(process.env.RESPONSE_CODE_OK);
            response.message = motorbikes;
        })
        .catch(error =>{
            response.status = parsetInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}


const addOne = function(req, res){ 
    const manufactureId = req.params.manufactureId; 

    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    } 
    
    debugLog(req.url, req.body)
  
    const response = {status :200, message :{}};

    Manufacture.findById(manufactureId) 
        .then(manufacture => _checkManufactureExist(manufacture, response))
        .then(manufacture=> _addMotorbike(req, manufacture, response))
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}

_checkManufactureExist = function(manufacture, response){
    return new Promise((resolve, reject)=>{
        if(manufacture){
            resolve(manufacture); 
        }else{
            response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
            response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            reject();
        } 
    });
}

_addMotorbike = function(req, manufacture, response){ 
    manufacture.motorbikes.push({
        modelName : req.body.modelName,
        year : req.body.year,
        horsePower : req.body.horsePower
    });  
 
    debugLog("add", manufacture);
    return new Promise((resolve, reject)=>{
        manufacture.save()
        .then(manufacture =>{
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufacture; 
            resolve(manufacture);
        })
        .catch((error)=>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR); 
            reject(error);
        });  
    });

}

const updateOne = function(req, res){
    const manufactureId = req.params.manufactureId; 

    const response = {status :200, message : {}};

    Manufacture.findById(manufactureId)
        .then(manufacture=> _checkManufactureExist(manufacture, response))
        .then(manufacture=> _updateMotorbike(req, manufacture, response))
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message =error.message; 
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}

const _updateMotorbike = function(req, manufacture, response){
      
    const motorbikeId = req.params.motorbikeId;
    debugLog(motorbikeId, manufacture);

    manufacture.motorbikes.id(motorbikeId).modelName = req.body.modelName; 
    manufacture.motorbikes.id(motorbikeId).year = req.body.year;
    manufacture.motorbikes.id(motorbikeId).horsePower = req.body.horsePower;
    manufacture.markModified(process.env.MOTORBIKE_COLLECTION); 

    debugLog("Update");

    return new Promise((resolve, reject)=>{
        manufacture.save()
        .then(updateManufacture =>{
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = updateManufacture; 
            resolve(updateManufacture);
        })
        .catch(error=>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR); 
            reject(error);
        })
    }); 
}

const deleteOne = function(req, res){
    const manufactureId = req.params.manufactureId; 
    const response = { status : 200,  message : {} };

    Manufacture.findById(manufactureId) 
    .then(manufacture => _checkManufactureExist(manufacture, response))
    .then(manufacture => _deleteMotorbike(req, manufacture, response))
    .catch(error =>{
        response.status = parseInt(process.env. RESPONSE_CODE_SERVER_ERROR);
        response.message = error.message; 
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    }); 
}

const _deleteMotorbike = function(req, manufacture, response){
    const motorbikeId = req.params.motorbikeId;

    return new Promise((resolve, reject)=>{
        if(manufacture.motorbikes.id(motorbikeId) === null){ 
            response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
            response.manufacture = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            reject(); 
        } 

        manufacture.motorbikes.id(motorbikeId).remove(); 
        manufacture.markModified(process.env.MOTORBIKE_COLLECTION);   
        manufacture.save()
            .then(()=>{
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = manufacture; 
                resolve(manufacture);
            })
            .catch(error=>{
                response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
                response.message = error.message;  
            });
    });
} 

module.exports ={
    getAll : getAll,
    getOne : getOne,
    addOne : addOne,
    updateOne : updateOne,
    deleteOne: deleteOne

}





