const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var watchlistSchema = new Schema({
    symbols: {
        type: [String],
        default: []
    },
    index: {
        type: Number,
    },
    ownedBy: {
        type: String,
    }
},{timestamp: true})

module.exports = mongoose.model('Watchlist',watchlistSchema);

