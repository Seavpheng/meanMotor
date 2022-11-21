const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);


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

    // Manufacture.findById(manufactureId).select(process.env.MOTORBIKE_COLLECTION).exec(function(err, manufacture){
    //     const response ={status : process.env.RESPONSE_CODE_OK, message: [manufacture]};
    //     if(err){
    //         console.message(err.message);
    //         response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
    //         response.message = err.message; 
    //     }  
        
    //     if(manufacture){
    //         res.status(response.status).json(manufacture.motorbikes.id(motorbikeId));
    //     }
    // });

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
  
    const response = {status :200, message :{}};

    Manufacture.findById(manufactureId).exec()
        .then(manufacture=>{
            if(!manufacture){
                response.status = process.env.RESPONSE_CODE_NOT_FOUND;
                esponse.message = process.env.RESPONSE_MESSAGE_NOT_FOUND; 
            }else{
                _addMotorbike(req, res, manufacture); 
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

function createMotorbike(motorbike){
    newMotorbike = {
        modelName : motorbike.modelName,
        year : motorbike.year,
        horsePower : motorbike.horsePower
    };
    return newMotorbike;
}

const _addMotorbike = function(req, res, manufacture){
     
    manufacture.motorbikes.push({
        modelName : req.body.modelName,
        year : req.body.year,
        horsePower : req.body.horsePower
    }); 
 
    manufacture.save(function(err, updatedManufacture){ 
        const response = {status : process.env.RESPONSE_CODE_OK, message: [updatedManufacture]};
        if(err){ 
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message =err.message;  

        } else if (updatedManufacture === null){
            response.status = RESPONSE_CODE_NO_CONTENT;
            response.message = updatedManufacture.motorbike; 

        } 
        res.status(response.status).json(response.message); 
    });
}

const updateOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    

    const response = {status :200, message : {}};

    Manufacture.findById(manufactureId).exec()
        .then(manufacture=>{
            if(!manufacture){
                response.status = RESPONSE_CODE_NO_CONTENT;
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
            }else{
                _updateMotorbike(req, res, updateManufacture); 
                return;
            }
        })
        .catch(error =>{
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message =error.message; 
        })
        .finally(()=>{
            res.status(response.status).json(response.message);
        });
}

const _updateMotorbike = function(req, res, manufacture){
     
    const motorbikeId = req.params.motorbikeId;
  
    if(manufacture.motorbikes.id(motorbikeId) === null){
        res.status(process.env.RESPONSE_CODE_NOT_FOUND).json(process.env.RESPONSE_MESSAGE_NOT_FOUND); 
        
    }else{
        manufacture.motorbikes.id(motorbikeId).modelName = req.body.modelName; 
        manufacture.motorbikes.id(motorbikeId).year = req.body.year;
        manufacture.motorbikes.id(motorbikeId).horsePower = req.body.horsePower;
        manufacture.markModified(process.env.MOTORBIKE_COLLECTION); 

        
        const response = {status :200, message :{}};
        manufacture.save()
            .then(updateManufacture =>{
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = process.env.RESPONSE_MESSAGE_UPDATE_SUCCESS;
            })
            .catch(error=>{
                response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
                response.message = error.message;
            })
            .finally(()=>{
                res.status(response.status).json(response.message);
            });

    }
}

const deleteOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    

    const response = { status : 200,  message : {} };

    Manufacture.findById(manufactureId).exec()
        .then(manufacture => {
            if(manufacture===null){
                response.status =parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;

                res.status(response.status).json(response.message); 
            }else{
                _deleteMotorbike(req, res, manufacture);
            }  
        })
        .catch(error =>{
            response.status = parseInt(process.env. RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message; 
            
            res.status( response.status).json(response.message);
        });
        

}

const _deleteMotorbike = function(req, res, manufacture){

    const motorbikeId = req.params.motorbikeId;

    if(manufacture.motorbikes.id(motorbikeId) === null){
        res.status(parseInt(process.env.RESPONSE_CODE_NOT_FOUND)).json(process.env.RESPONSE_MESSAGE_NOT_FOUND);
        return;
    }else{
        

        manufacture.motorbikes.id(motorbikeId).remove()
            .catch(error=>{
                res.status(process.env.RESPONSE_CODE_SERVER_ERROR).json(error.message);
            });

        manufacture.markModified(process.env.MOTORBIKE_COLLECTION); 
 

        manufacture.save()
            .then(()=>{
                response.status = parseInt(process.env.RESPONSE_CODE_NO_CONTENT);
                response.message = process.env.RESPONSE_MESSAGE_DELETE_SUCCESS; 
            })
            .catch(error=>{
                response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
                response.message = error.message;  
            });

    }  
} 

module.exports ={
    getAll : getAll,
    getOne : getOne,
    addOne : addOne,
    updateOne : updateOne,
    deleteOne: deleteOne

}





