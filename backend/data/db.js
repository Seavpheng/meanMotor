const mongoose = require("mongoose");
require('./manufacture.model');
require('./user.model');

// mongoose.connect(process.env.DB_URL,  {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log(  mongoose.connection.name + process.env.DB_STATUS_CONNECTED );
});

mongoose.connection.on("error", function(err){
    console.log(process.env.DB_STATUS_CONNECTION_ERROR, err)
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.DB_MESSAGE_SIGINT);
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log(process.env.DB_MESSAGE_SIGTERM);
        process.exit(0);
    });
})

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.DB_MESSAGE_SIGUSR2) 
        process.kill(process.pid, "SIGUSR2");
    });
});