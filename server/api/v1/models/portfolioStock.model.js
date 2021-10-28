const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var portfolioStockSchema = new Schema({
    
    ownedBy : {
        type: String,
    },
    portfolioId : {
        type: String,
    },
    symbl:{
        type: String
    },
    quantity : {
        type: Number,
        min: 0
    },
    totalInvestment : {
        type: String
    }
    // netWorth: {
    //     type: Number,
    // },
    // averageCostPrice: {
    //     type: Number
    // },
    // valueMarketPrice: {
    //     type: Number
    // },
    // unrealisedProfit: {
    //     type: Number,
    // },
})


module.exports = mongoose.model('PortFolioStock',portfolioStockSchema);