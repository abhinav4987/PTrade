var jwt = require('jsonwebtoken');


module.exports = function newAccessToken(user)  { 
    // return "helllo"



    let payload = {
        userName : user.userName,
        email : user.email
    }
    console.log(process.env.ACCESS_TOKEN_KEY);
    const accessToken = jwt.sign(payload
        ,process.env.ACCESS_TOKEN_KEY,
        { expiresIn: '1h' },{ algorithm: 'RS256'});


    return accessToken;
}






