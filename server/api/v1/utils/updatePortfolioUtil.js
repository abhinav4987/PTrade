const User = require("../models/user.model");
const PortFolioStock = require("../models/portfolioStock.model");
const Portfolio = require("../models/portfolio.model");
const {getFundamentalUtil} = require('../services/yFinance.services')




module.exports = (ownedBy, quantity, cost) => {

    try {
        Portfolio.find({ownedBy : ownedBy}, (err, doc) => {
            
            console.log("portfolio founbd :: ", doc);
            updateUtilOne(ownedBy,doc[0], quantity, cost);
        });
    }catch {(error) => {(error.message)}}
}


const updateUtilOne = (ownedBy,portfolio, quantity, cost) => {
    // console.log("working on : ", portfolio);
    try {
        PortFolioStock.find({ownedBy : ownedBy}, (err, doc) => {
            
            console.log("stocks owned :: ", doc);
            
            updateUtiltwo(doc,portfolio,quantity*cost);
        })
    }catch { (error) => {
            throw error
    }}
};


const updateUtiltwo = async (stocks, portfolio, amount) => {

    try {
        console.log("final step, ", portfolio);
        console.log("net stocks ", stocks);
        
        portfolio.funds += amount;
        let netUnrealised = 0;
        let netEquityInvest = 0;
        let netWorth = 0
        console.log(" length ", stocks.length);

        for(let i =0 ; i< stocks.length; i++) {
            console.log("working on : ", stocks[i]);
            let data = await getFundamentalUtil(stocks[i].symbl)
                console.log(data);
            let currPrice = parseFloat(data.lastPrice.replace(",",""));
            let value = parseFloat(currPrice)*parseFloat(stocks[i].quantity);

            netUnrealised += parseFloat(value) - parseFloat(stocks[i].totalInvestment);
            netEquityInvest += parseFloat(stocks[i].totalInvestment);
            netWorth += parseFloat(value);
            
            console.log("value: ", value, ", unrealised: ", netUnrealised);
        }


        netWorth += parseFloat(portfolio.funds);
        portfolio.netWorth  = parseFloat(netWorth)
        portfolio.unrealisedProfit = parseFloat(netUnrealised);
        portfolio.equityInvestment = parseFloat(netEquityInvest);
        console.log("new PortFolio : ", portfolio);
        portfolio.save().then(saved => {
            if(portfolio == saved) {
                // saved
            }
        })
    } catch {(error)=>
        console.log(error);
    }
}