const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullname :String,
    username :{
        type : String,
        require : true,
        unique : true
    },
    password :String
})

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION)