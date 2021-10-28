const PortFolio = require("../models/portfolio.model");
const User = require("../models/user.model")
const verifyRefreshToken2 = require('../utils/verifyRefreshToken2');
const getFund = require("../utils/getFunds");
const updatePortFolio = require("../utils/updatePortfolio");
const updatePortfolio = require("../utils/updatePortfolio");
const getFunds = (request, response) => {

    const decoded = verifyRefreshToken2(request.body.token);

    if(decoded.hasOwnProperty('email')) {
        getFund(decoded.email, response)
    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
};

const getPortFolio = (request, response) => {

    const decoded = verifyRefreshToken2(request.body.token);


    if(decoded.hasOwnProperty('email')) {
        User.find({email: decoded.email}, (err, doc) => {
            if(doc.length > 0) {
                PortFolio.find({ownedBy: doc[0]._id},(err, docs) => {
                    if(docs.length === 0 ) {
                        return response.status(400).json({
                            message: "Logout",
                        })
                    } else {
                        return response.status(200).json({
                            result: docs[0],
                        })
                    }   
                })
            } else {
                return response.status(400).json({
                    message: "Logout"
                })
            }
        });
        
    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
    
}



const update = (request, response) => {

    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {
        
        updatePortfolio(response, decoded.email);
        return response.status(200).json({
            message: "success"
        });
    } else {
        return response.status(400);
    }
}





module.exports = {
    getFunds,
    getPortFolio,
    update,
}

