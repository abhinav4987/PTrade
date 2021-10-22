const PortFolio = require("../models/portfolio.model");
const verifyRefreshToken2 = require('../utils/verifyRefreshToken2');
const getFund = require("../utils/getFunds");
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
        PortFolio.find({ownedBy: user._id},(err, doc) => {
            if(doc.length === 0 ) {
                return response.status(400).json({
                    message: "Logout",
                })
            } else {
                return response.status(200).json({
                    result: doc[0],
                })
            }   
        })
    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
    
}

const updatePortfolio = (request, response) => {

    const decoded = verifyRefreshToken2(request.body.token);


    if(decoded.hasOwnProperty('email')) {
        PortFolio.find({ownedBy: user._id},(err, doc) => {
            if(doc.length === 0 ) {
                return response.status(400).json({
                    message: "Logout",
                })
            } else {

                doc[0].networth = request.body.networth;
                doc[0].unrealisedProfit = request.body.unrealisedProfit;
                doc[0].equityInvestment = request.body.equityInvestment;
                doc[0].funds = request.body.funds;
                doc[0].save().then((saved) => {
                    return response.status(200).json({
                        result: doc[0],
                    })
                });
                
            }   
        })
    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
}


module.exports = {
    getFunds,
    getPortFolio,
    updatePortfolio
}

