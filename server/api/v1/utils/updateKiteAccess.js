const User = require('../models/user.model');

module.exports = (decoded, request, response) => {

    User.updateOne({
        email: decoded.email
    },{kiteAccessToken : request.body.kiteToken},function(err, updated) {
        if(err) {
            return response.status(500).json({
                success: false
            });
        } else {
            return response.status(200).json({
                success: true
            });
        }
    });
}

