debugLog = function(message, object){
    if(JSON.parse(process.env.DEBUG_MODE) === true){
        console.log(message, object);
    }
}
 