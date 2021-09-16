import { response } from "express";

const PortFolioStock = require("../models/portfolioStock.model");
const User = require("../models/user.model");



const functionUtil = (user,resposne) => {
    PortFolioStock.find({ownedBy: user._id},(err, doc) => {
        response.status(200).json({
            result: doc
        })
    })
}

export const sendAlPortfolioStocks = (email, response) => {
    User.find({email: email}, (err, doc) => {
        if(doc.length > 0) {
            functionUtil(doc[0],response);
        } else {
            response.status(400).json({
                message: "Logout"
            })
        }
    })
};
