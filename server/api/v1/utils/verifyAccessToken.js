const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

module.exports = (request) => 
    jwt.verify(request.body.token, "efhJHHvjVJHVJ456ecu76SD65cTY", function(err, decoded) {
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
