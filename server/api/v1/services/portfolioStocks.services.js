const verifyRefreshToken2 = require('../utils/verifyRefreshToken2');
const sendAlPortfolioStocks = require('../utils/sendAlPortfolioStocks');
const buyStocks = require("../utils/buyStocks");
const sellingLimit = require("../utils/sellingLimit");
const sellStocks = require("../utils/sellStocks");


const buy = (request, response) => {
    const symbl = request.body.symbl;
    const quantity = request.body.quantity;
    const cost = request.body.cost;

    try {
        const decoded = verifyRefreshToken2(request.body.token);
        if(decoded.hasOwnProperty('email')) {
            buyStocks(symbl,decoded.email,quantity, cost, response);
        } else {
            return response.status(400).json({
                message: "Logout"
            })
        }
    }catch (error) {
        console.log("error is caught.");
        return response.status(400).json({
            message: "error"
        });
    }
    
};


// symbl,email,quantity, cost, response

const sell = (request, response) => {
    const symbl = request.body.symbl;
    const quantity = request.body.quantity;
    const cost = request.body.cost;

    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {
        sellStocks(symbl,decoded.email,quantity, cost, response);
    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
};

const getAll = (request, response) => {
    console.log("getAll : ", request.body.token);
    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {
        sendAlPortfolioStocks(decoded.email,response);
    } else {
        resposne.status(400).json({
            message: "Logout"
        })
    }
};


const getSellLimit = (request, response) => {
    const decoded = verifyRefreshToken2(request.body.token);
    const symbl = request.body.symbl;
    if(decoded.hasOwnProperty('email')) {
        sellingLimit(decoded.email, symbl,response);
    } else {
        response.status(400).json({
            message: "Logout"
        })
    }
}





module.exports = {
    buy,
    sell,
    getAll,
    getSellLimit    
};