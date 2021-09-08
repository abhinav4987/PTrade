const mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var portfolioSchema = new Schema({
    ownedBy : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    netWorth: {
        type: Number,
    },
    unrealisedProfit: {
        type: Number
    },
    equityInvestment: {
        type: Number
    },
    funds : {
        type: Number
    }
},{timestamps: true});


module.exports = mongoose.model('PortFolio', portfolioSchema);
