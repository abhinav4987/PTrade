const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

module.exports =  function newRefreshToken(user) {
    try {
        
        const refreshToken = jwt.sign({
            email : user.email
        },"KJJnafgss76VYvwdVUOYVWOVFQUovwfo67v38fQ",{ expiresIn: '7d' },{ algorithm: 'RS256'});


        return refreshToken;
    } catch(error) {
        console.log(error);
    }
}

