const validateRegisterInput = require("./../validations/signup.validations");
const User = require('../models/user.model');
const hashPassword = require('../utils/hashPassword');
const registerNewUser = require('../utils/registerNewUser');
const verifyLogin = require('../utils/verifyLogin');



const registerUser = (request, response) => {
    
    const {isValid, errors} = validateRegisterInput(request.body);

    if(!isValid) {
        return response.status(400).json(errors);
    }

    User.find({email: request.body.email}, (error, user) => {
        if(user.length > 0) {
            return response.status(400).json({
                message: "User with give email ID already registered"
            })
        } else {
            registerNewUser(response,request.body);
        }
    })
}


const loginUser = (request, response) => {

    User.find(({email: request.body.email}), (error, user) => {
        console.log("users Found : ", user);
        if(user.length === 0) {
            return response.status(400).json({
                message: "User with given email is not registered."
            })
        } else {
            verifyLogin(response,user,request.body);
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}