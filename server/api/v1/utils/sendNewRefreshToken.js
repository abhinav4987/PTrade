const newRefreshToken = require('./newRefreshToken');
const verifyRefreshToken = require('./verifyRefreshToken');
const removeRefreshToken = require('./removeRefreshToken');
const addRefreshToken = require('./addRefreshToken');


module.exports = function sendNewRefreshToken(user, request, response) {
    try {
        var refresh = request.body.refreshToken
        if(refresh && user.refreshTokens.includes(refresh)) {
            const isValid = verifyRefreshToken(user,refresh);
            console.log(isValid);
            if(isValid && isValid.email) {
                removeRefreshToken(user,refresh,response);
                const newToken = newRefreshToken(user);
                console.log("logging : ",newToken);
                addRefreshToken(user,newToken,response); 
            } else {
                return response.status(500).json({
                    message: "Server Error"
                });
            } 
        } else {
            return response.status(400).json({
                message: "Re Login"
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}



