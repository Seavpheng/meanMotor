const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);
const responseHandler = require("../utilities/responseHandler");
require("../utilities/debugUtil");


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
    const response = responseHandler.createDefaultResponse(); 
    Manufacture.findById(manufactureId)  
        .then((manufacture) => _checkManufacture(manufacture, response))
        .catch((error) =>  _handleError(response, error))
        .finally(() => responseHandler.sendResponseData(res, response));  
}

_checkManufacture = function (manufacture, response){
    return new Promise((resolve, reject)=>{ 
        if(manufacture){
            response.message = manufacture;
            resolve();
        }else{
            response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
            response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            reject();
        }  
    })
} 
 
const getAll = function (req, res) {
 
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
 
    let search = {};
    if(req.query && req.query.search){
        const regex = new RegExp(req.query.search, 'i')
        search = {name : {$regex: regex}};

    } 

    const response = responseHandler.createDefaultResponse(); 

    Manufacture.find(search).count().then(numRecords => _computePage(numRecords, count, response));

    offset = offset * count;
    Manufacture.find(search).skip(offset).limit(count).exec()
        .then((manufactures) => {
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufactures;
        })
        .catch(error => {
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(() => responseHandler.sendResponse(res, response)
        );
}

_computePage = function(numRecords, recordPerPage, response){
    if(numRecords > 0){
        response.numPages = Math.ceil( numRecords /recordPerPage);
    }
}

const addOne = function (req, res) { 
    newManufacture = {
        name: req.body.name,
        shortDescription : req.body.shortDescription,
        establishedYear: req.body.establishedYear,
        motorbikes: []
    };

    const response = responseHandler.createDefaultResponse();

    Manufacture.create(newManufacture)
        .then(manufacture => {
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = manufacture;
        })
        .catch(error => {
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message; 
        })
        .finally(() => {
            responseHandler.sendResponseData(res, response);
        }) 
}

const deleteOne = function (req, res) { 
    const response = responseHandler.createDefaultResponse();

    Manufacture.findByIdAndRemove(req.params.manufactureId)
        .then(deletedManufacture => {
            if (!deletedManufacture) {
                response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            } else {
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = process.env.RESPONSE_MESSAGE_DELETE_SUCCESS;
            }
        })
        .catch(error => {
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message;
        })
        .finally(() => {
            responseHandler.sendResponseData(res, response);
        });
}

const updateOne = function (req, res) { 

    const response = responseHandler.createDefaultResponse();
 
    Manufacture.findById(req.params.manufactureId)
        .then(manufacture =>  _checkManufactureExist(manufacture, response))
        .then(manufacture=> _fullUpdate(req, manufacture, response))
        .catch(error => _handleError(response, error) )
        .finally(() => responseHandler.sendResponseData(res, response));
}
  
const _fullUpdate = function (req, manufacture, response) {
    return new Promise((resolve, reject)=>{
        manufacture.name = req.body.name;
        manufacture.establishedYear = req.body.establishedYear;
        manufacture.shortDescription = req.body.shortDescription;
     
        manufacture.save()
            .then(updatedManufacture => {
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = updatedManufacture;
                resolve(updatedManufacture);
            })
            .catch(error => {
                response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = error.message;
                reject();
            })
    })  
} 

const updatePartial = function (req, res) {
    
    const response = responseHandler.createDefaultResponse();

    Manufacture.findById(req.params.manufactureId)
        .then(manufacture =>  _checkManufactureExist(manufacture, response))
        .then(manufacture=> _partialUpdate(req, manufacture, response))
        .catch(error => _handleError(response, error))
        .finally(() => responseHandler.sendResponseData(res, response));
}

const _partialUpdate = function (req, manufacture, response) {
     
    return new Promise((resolve, reject)=>{
        if (req.body.name != undefined) {
            manufacture.name = req.body.name;
        }
        if (req.body.establishedYear != undefined) {
            manufacture.establishedYear = req.body.establishedYear;
        }
     
        manufacture.save()
            .then(updatedManufacture => {
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = updatedManufacture;
                resolve(updatedManufacture);
            })
            .catch(error => {
                response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = error.message;
                reject();
            })
    }); 
}

_checkManufactureExist= function(manufacture, response){
    return new Promise((resolve, reject)=>{
        if(manufacture !== null){ 
            response.message = manufacture;
            resolve(manufacture);
            
        }else{ 
            reponse.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
            response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            reject();
        }
    });
}

_handleError= function(response, error){ 
    response.message = error.message;
}  

module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne,
    updatePartial: updatePartial
}