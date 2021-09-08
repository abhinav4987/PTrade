const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

module.exports =  function newRefreshToken(user) {
    try {
        
        const refreshToken = jwt.sign({
            email : user.email
        },process.env.REFRESH_TOKEN_KEY,{ expiresIn: '7 days' },{ algorithm: 'RS256'});


        return refreshToken;
    } catch(error) {
        console.log(error);
    }
}

