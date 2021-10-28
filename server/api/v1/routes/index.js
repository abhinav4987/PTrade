const express = require('express');
const app = express();
const UserRoute = require('./user.routes');
const TokenRoute = require('./tokens.routes');
const NSEToolRoute = require('./nseTools.routes');
const yFinanceRoute = require('./yFinance.routes');
const watchListRoute = require('./watchList.routes');
const portFolioRoute = require('./portfolio.routes');
const portFolioStocksRoute = require("./portfolioStocks.routes");
const baseURL = "/api/v1"


function routerV1init(server ) {
    server.use(baseURL + "/user",UserRoute);
    server.use(baseURL + "/token",TokenRoute);
    server.use(baseURL + "/nseTool",NSEToolRoute);
    server.use(baseURL + "/yfinance",yFinanceRoute);
    server.use(baseURL + "/watchList",watchListRoute);
    server.use(baseURL + "/portfolio",portFolioRoute);
    server.use(baseURL + "/portfolioStocks",portFolioStocksRoute);
}


module.exports = routerV1init;





    
