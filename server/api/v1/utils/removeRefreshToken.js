const User = require('../models/user.model');

module.exports = function removeRefreshToken(user, token, response) {

    try {
        User.updateOne({email: user.email}, 
            { $pull:{refreshTokens: token}},
            function(error, deleted) {
                console.log(deleted);
                if(error) {
                    return response.status(400).json({
                        message : "Failure"
                    });
                } else {
                    return;
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}