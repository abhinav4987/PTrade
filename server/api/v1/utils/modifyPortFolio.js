const PortFolio = require("../models/portfolio.model");
const PortFolioStock = require("../models/portfolioStock.model");

const modifyUtil = (portfolio, newInvestment) => {
    portfolio.funds -+ newInvestment;
    portfolio.equityInvestment += newInvestment;
    portfolio.save().then(saved => {
        cosnole.log("portfolio is saved");
    })
};

const modidfyPortFolio = (userId, newInvestment) => {
    PortFolio.find({ 
        ownedBy: userId
    },(err, portfolio) => {
        if(portfolio.length > 0) {
            modifyUtil(portfolio, newInvestment);
        }
    })
}






