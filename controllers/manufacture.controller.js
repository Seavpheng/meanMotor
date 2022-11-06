const mongoose = require("mongoose");
const Manufacture = mongoose.model(process.env.MANUFACTURE_MODEL);

function createManufacture(body){
    manufacture = {
        name : body.name,
        establishedYear : body.establishedYear,
        //motorbikes : [{model_name : "Dream", year: 2000, horsePower: "200CC"}]
        motorbikes : []
    }; 
    return manufacture;
}; 

const getOne = function (req, res){
    const manufactureId = req.params.manufactureId;

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
        return ;
    }

    if(count > maxCount){
        response.status = process.env.RESPONSE_CODE_INCORRECT_FORMAT;
        response.message = RESPONSE_MESSAGE_EXCEED_LIMIT + count;
        res.status(respon.status).json(response.message);
        return ;
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
    const manufactureId = req.query.manufactureId;


    Manufacture.deleteOne({  manufactureId }, function(err, deletedManufactur){

        console.log("Deleted : ", deletedManufactur);

        const response = {status : process.env.RESPONSE_CODE_OK, message : deletedManufactur};
        if(err){
            console.error(err);
            response.status =  process.env.RESPONSE_CODE_SERVER_ERROR;
            response.message = { "message" : err } 
        }
        res.status(response.status).json(response.message);
    });
}

const updateOne = function(req, res){
    const manufactureId = req.params.manufactureId;
  
    if(req.body){ 
        Manufacture.updateOne({ manufactureId }, {$set : req.body }, function(err, updatedManufacture){
            const response = {status : process.env.RESPONSE_CODE_OK, message : updatedManufacture};

            if(err){
                console.error(err.message);
                response.status =  process.env.RESPONSE_CODE_SERVER_ERROR;
                response.message = { "message" : err.message} 
            }
            res.status(response.status).json(updatedManufacture);
        });   
    }  
}
  
module.exports = {
    getAll : getAll,
    getOne : getOne,
    addOne : addOne, 
    deleteOne : deleteOne,
    updateOne : updateOne
}