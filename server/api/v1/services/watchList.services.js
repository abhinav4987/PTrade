const User =  require('../models/user.model');
const WatchList = require('../models/watchList.model');
const hashPassword =  require('../utils/hashPassword');
const userService = require('../services/user.services');
const fetchAllWatchList = require('../utils/fetchAllWatchList');
const verifyRefreshToken2 = require('../utils/verifyRefreshToken2');
const addSymblToWatchlist = require("../utils/addSymblToWatchlist");
const removeSymbolFromWatchlist = require('../utils/removeSymbolFromWatchList');
// const watchListService = require("../services/watchList.services");



const getAllWatchList = (request, response) => {

    const token = request.body.token;
    console.log(request.body);
    
    try {
        const decoded = verifyRefreshToken2(token);
        console.log("hello watchList");
        console.log(decoded);
        if(decoded.hasOwnProperty("email")) {
            console.log("fetchhh : ",decoded.email);
            User.findOne({email : decoded.email},(err,doc) => {
                if(!err) {
                    fetchAllWatchList(doc,response);
                } else {
                    console.log("failed");
                    return response.status(400);
                }
            })
    
                
        }else {
            console.log("returning failed response");
            return response.status(400).json({
                error: "relogin"
            });
        }
    } catch (error) {
        response.status(400).json({error: error});
    }
    
    
}

const addSymbl = (request, response) => {
    const index = request.body.index;
    const token = request.body.token;
    const symbol = request.body.symbol;
    const decoded = verifyRefreshToken2(token);

    if(decoded.hasOwnProperty("email")) {
        User.findOne({email : decoded.email},(err,doc) => {
        
            if(!err) {
                addSymblToWatchlist(doc,index,symbol, response);
            } else {
                return response.status(400).json({
                    message: "logout"
                });
            }

        });
    }
}


const removeSymbl = (request, response) => {
    const index = request.body.index;
    const token = request.body.token;
    const symbol = request.body.symbol;

    const decoded = verifyRefreshToken2(token);
    // console.log("yeh hain decoded",decoded)
    if(decoded.hasOwnProperty("email")) {
        User.findOne({email : decoded.email},(err,doc) => {
            if(err) {
                console.log("doc yeh tha",doc);
                console.log(err);
               
                return response.status(400).json({
                    message: "logout"
                });
            } else {
                removeSymbolFromWatchlist(doc,index,symbol,response);
            }
        })
    }
};

// removeSymbolFromWatchlist(doc,index,symbol,response);

module.exports = {
    getAllWatchList,
    addSymbl,
    removeSymbl,
}