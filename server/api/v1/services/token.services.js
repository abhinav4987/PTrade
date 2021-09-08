const User = require('../models/user.model');
// const newAccessToken = require('../utils/newAccessToken');
// const newRefreshToken = require('../utils/newRefreshToken');
// const verifyRefreshToken = require('../utils/verifyRefreshToken');
const sendNewAccessToken = require('../utils/sendNewAccessToken');
const sendNewRefreshToken = require('../utils/sendNewRefreshToken');
const deleteRefreshToken = require('../utils/deleteRefreshToken');


const newAccessToken = (request, response) => {
    try {
        User.find({email: request.body.email}, (error,user) => {
            // console.log(user);
            if(user.length === 1) {
                sendNewAccessToken(user[0], request, response);
            } else {
                return response.status(400).json({ message: "User not Found/Invalid Refresh Token"});
            }
        })
    } catch (error){
        console.log(error);
    }
}

const newRefreshToken = (request, response) => {
    try{
        User.find({email: request.body.email}, (error,user) => {
            if(user.length === 1) {
                sendNewRefreshToken(user[0],request,response);
            } else{
                return response.status(200).json({ access: newToken});
            }    
        })
    } catch (error) {
        console.log(error);
    }
}

const removeRefreshToken = (request, response) => {
    try{
        User.find({email: request.body.email}, (error,user) => {
            if(user.length === 1) {
                deleteRefreshToken(user, request, response);
            } else {
                return response.status(400);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newAccessToken,
    newRefreshToken,
    removeRefreshToken
}