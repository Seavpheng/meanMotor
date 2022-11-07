const mongoose = require("mongoose");

const motorbikeSchema = new mongoose.Schema({
    modelName : {
        type : String,
        require: true
    },
    year : {
        type : Number,
        min : 1900
    },
    horsePower : String
});

const manufactureSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Manufacture name is required']
    },
    establishedYear : {
        type : Number,
        min : 1900
    }, 

    motorbikes : [motorbikeSchema]
});

mongoose.model(process.env.MANUFACTURE_MODEL, manufactureSchema, process.env.MANUFACTURE_COLLECTION);
