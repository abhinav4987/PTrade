const verifyRefreshToken = require('./verifyRefreshToken');
const newAccessToken = require('./newAccessToken');


module.exports = async function sendNewAccessToken(user, request, response) {
    console.log(user);
    var refresh = request.body.refreshToken
    console.log(refresh);
    console.log(user.refreshTokens.includes(refresh));
    if(refresh && user.refreshTokens.includes(refresh)) {
        const isValid = await verifyRefreshToken(user,refresh,response);
        if(isValid)
        console.log(isValid);
        if(isValid && isValid.email) {
            console.log("enterrred");
            const newToken = newAccessToken(user);
            console.log(newToken)
            return response.status(200).json({
                access : newToken
            });
        } else {
            console.log("enterrred 2");
            return response.status(400).json({
                message: "error"
            })
        }
    } else {    
        return response.status(400).json({
            message: "Re Login"
        })
    }
}