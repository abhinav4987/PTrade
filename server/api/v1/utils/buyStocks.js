const User = require("../models/user.model");
const PortFolioStock = require("../models/portfolioStock.model");
const Portfolio = require("../models/portfolio.model");
const updatePortfolioUtil = require("./updatePortfolioUtil");


module.exports = function buyStocks(symbl,email,quantity, cost, response) {

    User.find({email: email}, (err, user) => {
        if(user.length > 0) {
            buyStockUtil(user[0],symbl,quantity,cost,response);
        } else {
            response.status(400).json({message: "Logout"});
        }
    })
}


const registerNewStock = (user, symbl, quantity, cost, response) => {

    Portfolio.find({ownedBy: user._id}, (err, doc) => {
        if(doc.length > 0) {
            let newBuy = new PortFolioStock({
                ownedBy: user._id,
                symbl: symbl,
                portfolioId: doc[0]._id,
                quantity: quantity,
                totalInvestment: parseFloat(cost)*parseFloat(quantity)
            });

            newBuy.save().then((data) => {
                console.log("registering new stock");
                updatePortfolioUtil(user._id,quantity,-1*cost);
                response.status(200).json({
                    message: "success"
                })
            }).catch((error) =>
                response.json({message: "error"})
            )
        }
    })
}



const buyStockUtil = (user, symbl,quantity,cost,response) => {
    
    PortFolioStock.find({
        ownedBy: user._id,
        symbl: symbl
    },(err, doc) => {
        if(doc.length > 0) {
            modifyStock(doc[0],quantity,cost,response);
        } else {
            
            registerNewStock(user,symbl,quantity,cost,response);

            let newBuy = new PortFolioStock({
                ownedBy: user._id,
                symbl: symbl,
            })
        }
    })
}

const modifyStock = (doc, quantity, cost, response) => {
    

    let investPerStcok = doc.totalInvestment/doc.quantity;
    doc.quantity += parseFloat(quantity);
    doc.totalInvestment = doc.quantity*investPerStcok;
    let ownedBy = doc.ownedBy

    

    doc.save().then(saved => {
        if(doc === saved) {
            // modifyPortfolio(doc.ownedBy);
            console.log("updating stock ");
            updatePortfolioUtil(ownedBy, quantity, cost*-1)
            response.status(200).json({
                message: "success"
            
            })
        } else {
            resposne.status(400).json({
                message: error
            })
        }
    })
}