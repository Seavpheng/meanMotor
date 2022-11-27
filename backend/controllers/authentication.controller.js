const jwt = require("jsonwebtoken");
const util = require("util")


const _sendResponse = function(res, response){
    res.status(parseInt(response.status, 10)).json(response.message);
}
// function decide to call next or not
const authenticated = function(req,res, next){
    const response ={
        status : 403,
        message : {message : "no toke provide"}
    };

    const headerExists = req.headers.authorization;
 
    if(headerExists){
        const token = req.headers.authorization.split(' ')[1];
        
        
        const jwtVerifyPromise = util.promisify(jwt.verify, {context :jwt});

        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
            .then(()=>next())
            .catch(()=>{
                response.message = "invalid token";
                _sendResponse(res, response);
            }); 
    }
    else{
         _sendResponse(res, response);
    }
}
 
module.exports = {
    authenticated : authenticated
}
