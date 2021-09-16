const verifyRefreshToken2 = require('../utils/verifyRefreshToken2');


const buy = (request, response) => {
    const symbl = request.body.symbl;
    const quantity = request.body.quantity;
    const cost = request.body.cost;

    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {

    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }


};

const sell = (request, response) => {
    const symbl = request.body.symbl;
    const quantity = request.body.quantity;
    const cost = request.body.cost;

    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {

    } else {
        return response.status(400).json({
            message: "Logout"
        })
    }
};

const getAll = (request, response) => {
    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {
        sendAlPortfolioStocks(decoded.email,response);
    } else {
        resposne.status(400).json({
            message: "Logout"
        })
    }
}


const getSellLimit = (reuqest, response) => {
    const decoded = verifyRefreshToken2(request.body.token);
    if(decoded.hasOwnProperty('email')) {
        getSellLimit()
    } else {
        resposne.status(400).json({
            message: "Logout"
        })
    }
}




module.exports = {
    buy,
    sell,
    getAll
};