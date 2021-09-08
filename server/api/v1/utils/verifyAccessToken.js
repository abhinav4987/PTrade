const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

module.exports = (request) => 
    jwt.verify(request.body.token, prrocess.env.REFRESH_TOKEN_KEY, function(err, decoded) {
        if(err) {
            return {
                isValid: false,
                decoded: null
            }
        } else {
            return {
                isValid: true,
                decoded: decoded
            }
        }
    });
