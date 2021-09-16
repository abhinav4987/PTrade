const User = require("../models/user.model");
const PortFolioStock = require("../models/portfolioStock.model");

module.exports = function buyStocks({symbl,email,quantity, cost, response}) {

    User.find({email: email}, (err, user) => {
        if(user.length > 0) {
            buyStockUtil(user[0],symbl,quantity,cost,response);
        } else {
            response.status(400).json({message: "Logout"});
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
            
        }
    })
}

const modifyStock = (doc, quantity, cost, response) => {
    doc.quantity += quantity;
    totalInvestment += quantity*cost;

    doc.save().then(saved => {
        if(doc === saved) [
            // modifyPortfolio(doc.ownedBy);
            response.status(200).json({
                message: "success"
            
        ]
    })
}