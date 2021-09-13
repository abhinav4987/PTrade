const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var boughtEquitySchema = new Schema({
    
    portfilioID : {
        type: String
    },
    userId : {
        type : String
    },
    symbl : {
        type: String
    },
    units : {
        type: Number
    },
    totalInvestment : {
        type: Number
    }
})