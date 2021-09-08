const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

module.exports = (token)  => 
    
    
    jwt.verify(token, process.env.REFRESH_TOKEN_KEY, function(err, decoded) {
        if (err) {

            User.update({email: user.email}, 
                { $pull:{refreshTokens: [token]}},
                function(error, deleted) {
                    console.log(deleted);
                    if(error) {
                        console.log(error);
                        return error;
                        
                    } else {
                        console.log(err);
                        return err;
                    }
                }
            )
        } else {
            // console.log("return decoded");
            return decoded;
        }
    });

