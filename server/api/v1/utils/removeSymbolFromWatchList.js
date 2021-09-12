const Watchlist = require('../models/watchList.model');

module.exports = function removeSymbolFromWatchlist(user,index,symbols,response) {

    console.log("isko mitao",symbols," ",index, " ", user._id);

    Watchlist.findOneAndUpdate({
        index: index,
        ownedBy: user._id
    },{
        $pull: {symbols: symbols}
    },(err, result) => {
        if(err) {
            return response.status(500);
        } else {
            console.log("response yeh aya  hain", result);
            return response.status(200).json({
                message: "successful"
            })
        }
    })

}



// {
//     $pull: {symbols: [symbols]}
// }