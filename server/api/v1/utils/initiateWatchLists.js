const WatchList = require('../models/watchList.model');

const initializeWatchList = async (userId) => {

    console.log("initiating ");
    const watchlist1 = WatchList({
        symbols : [
            'INFY',
            'HDFCBANK',
            'SBIN',
            'ICICIBANK',
            'AXISBANK',
            'INDUSINDBK'
        ],
        index : 0,
        ownedBy : userId,
    });

    const watchlist2 = WatchList({
        symbols : [],
        index : 1,
        ownedBy : userId,
    });
    const watchlist3 = WatchList({
        symbols : [],
        index : 2,
        ownedBy : userId,
    });
    const watchlist4 = WatchList({
        symbols : [],
        index : 3,
        ownedBy : userId,
    });
    const watchlist5 = WatchList({
        symbols : [],
        index : 4,
        ownedBy : userId,
    });
    console.log("saving ");
    await watchlist1.save();
    console.log("saved 1");
    await watchlist2.save();
    console.log("saved 2");
    await watchlist3.save();
    console.log("saved 3");
    await watchlist4.save();
    console.log("saved 4");
    await watchlist5.save();
    console.log("saved 5");
}


module.exports = initializeWatchList;