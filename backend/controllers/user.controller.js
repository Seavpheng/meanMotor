const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");

const responseHandler = require("../utilities/responseHandler");

const addUser = function (req, res) {
    let password = req.body.password;  
    const response = responseHandler.createDefaultResponse(); 
    bcrypt.genSalt(10)
        .then(salt => _generateHash(password, salt))
        .then(hash => _createUser(req, hash, response))
        .then(user => _sendToken(user, response))
        .catch(error => _handleError(error, response))
        .finally(()=>{
            debugLog("error", response);
            responseHandler.sendResponse(res, response)
        } ); 
} 

_generateHash = function(password, salt){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, salt)
        .then(hash=>{
            resolve(hash)
        })
        .catch(()=>{
            reject()
        }); 
    }); 
}

_fillUser = function(req, hash){
    return user = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: hash
    };
}

_createUser =function(req, hash, response){ 
    const user = _fillUser(req, hash); 
    return new Promise((resolve, reject)=>{
        User.create(user)
        .then(user => { 
            response.status = parseInt(process.env.RESPONSE_CODE_OK);
            response.message = user; 
            resolve(user);
        })
        .catch((error) => {  
            response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
            response.message = error.message; 
            reject(error);
        }); 
    }); 
}

const login = function (req, res) {  
    console.log(req.body)

    const response = responseHandler.createDefaultResponse();// _createDefaultResponse();   

    User.findOne({ username: req.body.username })
        .then(user => _checkUserExist(user, response))
        .then(user => _checkPasswordMatch(req.body.password, user, response))
        .then(user => _sendToken(user, response))
        .catch(error => {console.log(error);_handleError(error, response)})
        .finally(() => responseHandler.sendResponse(res, response)); 
} 

_checkUserExist = function (user, response) { 
    return new Promise((resolve, reject) => { 
        if (user) {  
            resolve(user);
        } else { 
            response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
            response.message = process.env.RESPONSE_MESSAGE_INVALID_USER;
            reject(); 
        }
    });
}

_checkPasswordMatch = function (password, user, response) {
    return new Promise((resolve, reject) => { 
        bcrypt.compare(password, user.password).then(isMatch => {  
            if (isMatch) {
                response.status = parseInt(process.env.RESPONSE_CODE_OK);
                response.message = process.env.RESPONSE_MESSAGE_LOGIN_SUCCESS; 
                resolve(user);  
            } else {
                response.status = parseInt(process.env.RESPONSE_CODE_NOT_FOUND);
                response.message = process.env.RESPONSE_MESSAGE_INVALID_USER;
                reject(response.message);
            }
        })
    });
}

_sendToken = function (user, response) {
    const token = Jwt.sign({ username: user.username }, process.env.JWT_PASSWORD, { expiresIn: 3600 });
    response.token = token;
}

_handleError = function (error, response) {
    //response.status = parseInt(process.env.RESPONSE_CODE_SERVER_ERROR);
    //response.message = error.message;
}

module.exports = {
    register: addUser,
    login: login
}