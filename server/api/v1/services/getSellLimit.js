const PortFolioStock = require("../models/portfolioStock.model");
const User = require("../models/user.model")
export const getSellLimit = (symbl,email,response) => {

    User.find({email: email},(err,doc) => {
        if(doc.length > 0) {
            functionUtil(doc,symbl)
        }else {
            response.json(400).json({
                message: "Logout",
            })
        }
    })
};

const functionUtil = (user, symbl) => {

    PortFolioStock.find({
        symbl: symbl,
        ownedBy: user._id
    },(err, doc) => {
        if(doc.length === 0 ) {
            return response.status(200).json({
                limit: 0
            });
        } else {
            return response.status(200).json({
                limit: doc[0].quantity
            });
        }
    });
}

