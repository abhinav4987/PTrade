const Watchlist = require('../models/watchList.model');

module.exports = function addSymbolToWatchlist(user,index,symbols,response) {
    console.log("adding this", symbols);
    Watchlist.findOneAndUpdate({
        index: index,
        ownedBy: user._id
    },{
        $push: {symbols: symbols}
    },(err, result) => {
        if(err) {
            return response.status(500);
        } else {
            return response.status(200).json({
                message: "successful"
            })
        }
    })

}
