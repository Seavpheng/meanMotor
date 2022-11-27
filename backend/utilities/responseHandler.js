module.exports.sendResponse = function (res, response) {  
    console.log(response); 
    res.status(parseInt(response.status)).json(response);
} 

module.exports.sendResponseData = function(res, response){
    res.status(response.status).json(response.message);
}
 
module.exports.createDefaultResponse = function (status, message) {
    return response = { status: 200, message: {} };
}
 