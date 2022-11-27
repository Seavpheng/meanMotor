const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullname :{
        type : String,
        required : [true, 'Full Name is required']
    },
    username :{
        type : String,
        required : [true, 'Username is required'],
        unique : true
    },
    password :{
        type : String,
        required : [true, 'Full Name is required']
    }
})

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION)