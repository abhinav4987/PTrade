const User = require("../models/user.model");
const PortFolioStock = require("../models/portfolioStock.model");

module.exports = (email, symbl,response) => {

    User.find({email: email}, (err, user) => {
        if(user.length > 0) {
            findUtil(user[0],symbl, response);
        } else {
            return response.status(400).json({
                message: err
            })
        }
    })
}

const findUtil = (user, symbl, response) => {

    PortFolioStock.find({ownedBy: user._id,symbl: symbl}, (err, data) => {
        if(data.length > 0) {
            return response.status(200).json({
                result: data[0].quantity
            });
        }else {
            return response.status(200).json({
                result: false
            })
        }
    })
}