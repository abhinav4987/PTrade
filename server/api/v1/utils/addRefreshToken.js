const User = require('../models/user.model')

module.exports = function addRefreshToken(user,token,response) {

    try {
        console.log("logging 2 : ",token);
        User.updateOne(
            {email : user.email},
            { $push : { refreshTokens: [token]}},
            function(error, result) {
                console.log(result)
                if(error) {
                    return response.status(500);
                } else {
                    console.log("logging3 : ",token);
                    return response.status(200).json({
                        refresh : token
                    })
                }
            }
        )

    } catch (error) {
        console.log(error);
    }
}