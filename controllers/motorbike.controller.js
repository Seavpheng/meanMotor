const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);


const getAll = function(req, res){
    const manufactureId = req.params.manufactureId;

    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    } 

    Manufacture.findById(manufactureId).select(process.env.MOTORBIKE_COLLECTION).exec(function(err, manufacture){
        const response ={status : process.env.RESPONSE_CODE_OK, message: [manufacture]};
        if(err){
            console.message(err.message);
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = err.message;
        }  
        res.status(response.status).json(response.message); 
    });
}


const getOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    } 
    const motorbikeId = req.params.motorbikeId;

    Manufacture.findById(manufactureId).select(process.env.MOTORBIKE_COLLECTION).exec(function(err, manufacture){
        const response ={status : process.env.RESPONSE_CODE_OK, message: [manufacture]};
        if(err){
            console.message(err.message);
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = err.message;

            return;
        }  
        
        if(manufacture){
            res.status(response.status).json(manufacture.motorbike.id(motorbikeId));
        }
    });
}

const addOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    

    Manufacture.findById(manufactureId).exec(function(err, manufacture){
        const response = {status : process.env.RESPONSE_CODE_OK, message : manufacture};
 
        if(err){ 
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message =err.message; 

        } else if (manufacture === null){
            response.status = process.env.RESPONSE_CODE_NOT_FOUND;
            response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND; 
        }

        if(manufacture){
            _addMotorbike(req, res, manufacture); 
        }
        else{
            res.status(response.status).json(response.message);
        }
    });
}

function createMotorbike(motorbike){
    newMotorbike = {
        model_name : motorbike.model_name,
        year : motorbike.year,
        horsePower : motorbike.horsePower
    };
    return newMotorbike;
}

const _addMotorbike = function(req, res, manufacture){
     
    manufacture.motorbikes.push({
        model_name : req.body.model_name,
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
    Manufacture.findById(manufactureId).exec(function (err, updateManufacture){
        if(err){ 
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message =err.message; 
          
        } else if(updateManufacture === null){
            response.status = RESPONSE_CODE_NO_CONTENT;
            response.message = updatedManufacture.motorbike;
        }

        if(updateManufacture){
            _updateMotorbike(req, res, updateManufacture);
            return;

        }  
        res.status(response.status).json(response.message); 
        
    });
}

const _updateMotorbike = function(req, res, manufacture){
     
    const motorbikeId = req.params.motorbikeId;
  
    if(manufacture.motorbikes.id(motorbikeId) === null){
        res.status(process.env.RESPONSE_CODE_NOT_FOUND).json(process.env.RESPONSE_MESSAGE_NOT_FOUND); 
        
    }else{
        manufacture.motorbikes.id(motorbikeId).model_name = req.body.model_name; 
        manufacture.motorbikes.id(motorbikeId).year = req.body.year;
        manufacture.motorbikes.id(motorbikeId).horsePower = req.body.horsePower;
        manufacture.markModified(process.env.MOTORBIKE_COLLECTION); 

        manufacture.save(function(err, updatedManufacture ){ 
            const response = {status : process.env.RESPONSE_CODE_OK, message: updatedManufacture };
            if(err){ 
                response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = err.message;  

            } else {
                if(updatedManufacture === null){
                    response.status = process.env.RESPONSE_CODE_NO_CONTENT;
                    response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND; 
                }
            }
           
            res.status(response.status).json(response.message); 
        });
    }
}

const deleteOne = function(req, res){
    const manufactureId = req.params.manufactureId;
    
    Manufacture.findById(manufactureId).exec(function(err, manufacture){

        const response = {status : "", message: "" };

        if(err){ 
            response.status = RESPONSE_CODE_SERVER_ERROR;
            response.message =err.message; 

        }else{
            if(manufacture === null){
                response.status =process.env.RESPONSE_CODE_NO_CONTENT;
                response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;

            }else{
                _deleteMotorbike(req, res, manufacture);
                return;
            }
        }

        res.status(response.status).json(response.message);
    });

}

const _deleteMotorbike = function(req, res, manufacture){

    const motorbikeId = req.params.motorbikeId;

    if(manufacture.motorbikes.id(motorbikeId) === null){
        res.status(process.env.RESPONSE_CODE_NOT_FOUND).json(process.env.RESPONSE_MESSAGE_NOT_FOUND);
    }else{
        manufacture.motorbikes.id(motorbikeId).remove(function(err, removedMotorbike){
            if(err){
                res.status(process.env.RESPONSE_CODE_SERVER_ERROR).json(err.message);
            }
        });

        manufacture.markModified(process.env.MOTORBIKE_COLLECTION); 
        manufacture.save(function(err, updatedManufacture ){ 
            const response = {status : process.env.RESPONSE_CODE_OK, message: updatedManufacture };
            if(err){ 
                response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = err.message;  

            } else {
                if(updatedManufacture === null){
                    response.status = process.env.RESPONSE_CODE_NO_CONTENT;
                    response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND; 
                }
            }
           
            res.status(response.status).json(response.message); 
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





