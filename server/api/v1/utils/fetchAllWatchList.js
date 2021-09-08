const Watchlist = require('../models/watchList.model')

module.exports = function fetchAllWatchList(user,response) {
    console.log("fetching...");
    
    var ObjectId = require('mongoose').Types.ObjectId;
    console.log(user._id);
    Watchlist.find({ownedBy : user._id},(err, docs) => {
        if(err) {
            return response.status(400)
        } else {
            return response.status(200).json(docs);
        }
    })
}