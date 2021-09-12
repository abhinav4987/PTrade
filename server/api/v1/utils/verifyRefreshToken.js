const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

module.exports = (user, token, response)  => 
    
    
    jwt.verify(token, "KJJnafgss76VYvwdVUOYVWOVFQUovwfo67v38fQ", function(err, decoded) {
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
            console.log("return decoded");
            return decoded;
        }
    });


