const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var portfolioStockSchema = new Schema({
    ownedBy : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity : {
        type: Number,
        min: 0
    },
    netWorth: {
        type: Number,
    },
    averageCostPrice: {
        type: Number
    },
    valueMarketPrice: {
        type: Number
    },
    unrealisedProfit: {
        type: Number,
    },
})


module.exports = mongoose.model('PortFolioStock',portfolioStockSchema);