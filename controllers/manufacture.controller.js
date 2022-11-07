const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);

function createManufacture(body){
    manufacture = {
        name : body.name,
        establishedYear : body.establishedYear, 
        motorbikes : []
    }; 
    return manufacture;
}; 

const getOne = function (req, res){
    const manufactureId = req.params.manufactureId;
 
    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    }

    Manufacture.findById(manufactureId).exec(function(err, manufacture){
        const response ={status : process.env.RESPONSE_CODE_OK, message: [manufacture]};
        if(err){
            console.message(err.message);
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = err.message;
        }  
        res.status(response.status).json(response.message); 
    });
}

const getAll = function(req, res){ 
    let offset ;
    if(req.query && req.query.offset ){
        offset = parseInt(req.query.offset, 10);
    } 

    let count;
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    } 

    let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

    if(isNaN(offset) || isNaN(count)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_NUMBER);
        return;
    }

    if(count > maxCount){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).send(process.env.RESPONSE_MESSAGE_EXCEED_LIMIT + count);
        return;
    }  

    Manufacture.find().skip(offset).limit(count).exec(function(err, manufactures){
        if(err){
            res.status(process.env.RESPONSE_CODE_SERVER_ERROR).json(err.message);
        } 
        res.status(process.env.RESPONSE_CODE_OK).json(manufactures);
    });
}

const addOne = function(req, res){ 
   
    const newManufacture = createManufacture(req.body); 
   
    Manufacture.create(newManufacture, function(err, manufacture){
        const response = {status : 200, message : manufacture};
        if(err){
            console.error(err.message)
            response.status = 500;
            response.message = err.message;
        }  
        res.status(response.status).json(response.message);
    });
} 

const deleteOne = function(req, res){
    const manufactureId = req.params.manufactureId; 
    
    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return ;
    } 

    Manufacture.findOneAndDelete(manufactureId).exec(function(err, deletedManufacture){
        const response = {status : process.env.RESPONSE_CODE_OK, message : deletedManufacture};
        if(err){
            console.error(err);
            response.status =  process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message =  err.message; 
        }  else if(!deletedManufacture){
            console.log();
            response.status =  process.env.RESPONSE_CODE_NOT_FOUND;
            response.message =  process.env.RESPONSE_MESSAGE_NOT_FOUND; 
        }

        res.status(response.status).json(response.message);
    });
}

const updateOne = function(req, res){ 
    const manufactureId = req.params.manufactureId;

    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return;
    } 

    Manufacture.findById(manufactureId).exec(function(err, manufacture){
        const response = {status : process.env.RESPONSE_CODE_OK, message :"" };
        if(err){
            response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = err.message;
            
        }else if(!manufacture){
            response.status = process.env.RESPONSE_CODE_NOT_FOUND;
            response.message = process.env.RESPONSE_MESSAGE_NOT_FOUND;
        }

        if(manufacture){
            manufacture.name = req.body.name;
            manufacture.establishedYear = req.body.establishedYear;
             
            manufacture.save(function(err, updatedManufacture){
                if(err){
                    response.status = process.env.RESPONSE_CODE_SERVER_ERROR;
                    response.message = err.message;
                } 
                //res.status(response.status).json(response.message);
 
            });  
        }

        res.status(response.status).json(response.message);

    }); 

} 

const updatePartial = function(req, res){
    const manufactureId = req.params.manufactureId;

    if(!mongoose.isValidObjectId(manufactureId)){
        res.status(process.env.RESPONSE_CODE_INCORRECT_FORMAT).json(process.env.RESPONSE_MESSAGE_INCORRECT_INPUT); 
        return 
    } 

    if(req.body){ 
        const filter = {_id : manufactureId };

        const update ={};
        if(req.body.name != undefined){
            update['name'] =  req.body.name ; 
        }
        if(req.body.establishedYear != undefined){
            update['establishedYear'] =  req.body.establishedYear ; 
        } 
  
        Manufacture.findOneAndUpdate(filter, update, {upsert : true}, function(err, foundManufacture){ 
            const response = {status : process.env.RESPONSE_CODE_OK, message : foundManufacture};
  
            if(err){
                console.error(err.message);
                response.status =  process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = err.message; 
            }

            res.status(response.status).json(foundManufacture);
        });   
    } 
} 

module.exports = {
    getAll : getAll,
    getOne : getOne,
    addOne : addOne, 
    deleteOne : deleteOne,
    updateOne : updateOne,
    updatePartial: updatePartial
}