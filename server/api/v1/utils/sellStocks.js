const User = require("../models/user.model");
const PortFolioStock = require("../models/portfolioStock.model");
const Portfolio = require("../models/portfolio.model");
const updatePortfolioUtil = require("./updatePortfolioUtil");

module.exports = function buyStocks(symbl,email,quantity, cost, response) {

    User.find({email: email}, (err, user) => {
        if(user.length > 0) {
            sellStockUtil(user[0],symbl,quantity,cost,response);
        } else {
            response.status(400).json({message: "Logout"});
        }
    })
}





const sellStockUtil = (user, symbl,quantity,cost,response) => {
    
    PortFolioStock.find({
        ownedBy: user._id,
        symbl: symbl
    },(err, doc) => {
        if(doc.length > 0) {
            modifyStock(doc[0],quantity,cost,response);
        } else {
            
            return response.status(400).json({
                message: "error"
            })
        }
    })
}


const modifyStock = (doc, quantity, cost, response) => {
    console.log("converting stock: ", doc);
    // doc.overwrite({quantity: doc.quantity-  quantity}) 
    // doc.overwrite({totalInvestment : doc.totalInvestment + quantity*cost})
    // let ogQuantity
    let investPerStcok = doc.totalInvestment/doc.quantity;
    doc.quantity -= quantity;
    doc.totalInvestment = doc.quantity*investPerStcok;
    let ownedBy = doc.ownedBy
    console.log("new stock", doc);

    if(doc.quantity === 0) {
        PortFolioStock.findByIdAndDelete(doc._id, (err) => {
            if(err) {
                
                return response.status(400).json({message: "error"});
            } else {
                updatePortfolioUtil(ownedBy,quantity,cost);
                return response.status(200).json({message: "success"})
            }

        })
    }
    doc.save().then(saved => {
        if(doc === saved) {
            updatePortfolioUtil(ownedBy,quantity,cost);
            // modifyPortfolio(doc.ownedBy);
            return response.status(200).json({
                message: "success"
            
            })
        } else {
            return resposne.status(400).json({
                message: error
            })
        }
    })
}