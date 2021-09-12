const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const newAccessToken = require('../utils/newAccessToken');
const newRefreshToken = require('../utils/newRefreshToken')



module.exports = async function verifyLogin(response,user, data) {
    
    const match = await bcrypt.compare(data.password, user[0].password);
    if(match) {
        const accessToken = newAccessToken(user[0]);
        const refreshToken = newRefreshToken(user[0]);
        
        User.updateOne(
            {email : user[0].email},
            { $push : { refreshTokens: [refreshToken]}},
            function(error, result) {
                if(error) {
                    return response.status(500);
                } else {
                    return response.status(200).json({
                        access : accessToken,
                        refresh : refreshToken
                    })
                }
            }
        )
    } else {
        return response.status(400).json({
            message: "Invalid credentials."
        })
    }
}