

const PortFolioStock = require("../models/portfolioStock.model");
const User = require("../models/user.model");




const functionUtil = (user,response) => {
    console.log("finding owned stocks : " );
    PortFolioStock.find({ownedBy: user._id},(err, doc) => {
        console.log("i searched ", doc," errors : ", err);
        response.status(200).json({
            result: doc
        })
    })
}


const sendAlPortfolioStocks = (email, response) => {

    console.log("a query came : ");
    User.find({email: email}, (err, doc) => {
        if(doc.length > 0) {
            console.log("user found for stocks");
            functionUtil(doc[0],response);
        } else {
            response.status(400).json({
                message: "Logout"
            })
        }
    })
};


module.exports = sendAlPortfolioStocks