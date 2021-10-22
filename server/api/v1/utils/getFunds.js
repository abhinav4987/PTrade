const PortFolio = require("../models/portfolio.model");
const User = require("../models/user.model");


function getFund(email, response) {
    
    User.find({email: email},(err,doc) => {
        if(doc.length > 0) {
            utilFunction(doc[0],response);
        } else {
            console.log("userNahi Hian")
            return resposne.status(400).json({
                message : "Logout"
            })
        }
    })
}


const utilFunction = (user, response) => {
    PortFolio.find({
        ownedBy: user._id
    },(err, doc) => {

        console.log("Funds kee baat", err, " kee jae", doc);
        if(doc.length > 0) {
            return response.status(200).json({
                funds: doc[0].funds
            })
        } else {
            return response.status(400).json({
                message: "Logout"
            })
        }
    });
}

module.exports = getFund;