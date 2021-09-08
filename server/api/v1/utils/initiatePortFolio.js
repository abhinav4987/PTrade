const Portfolio = require('../models/portfolio.model');


const initiatePortFolio = (user) => 
    
    new Portfolio({
        ownedBy : user._id,
        netWorth : 20000,
        unrealisedProfit : 0,
        equityInvestment : 0,
        funds : 20000
    }).save()
    .then((data) => {
        return data._id
    }).catch((error) => {
        return null
    })



module.exports = initiatePortFolio;