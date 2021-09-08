const hashPassword = require('../utils/hashPassword');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const inititiatePortFolio = require('../utils/initiatePortFolio');
const initializeWatchList = require('../utils/initiateWatchLists');

const  registerNewUser = (response,data) => {


    const fullName = data.fullName;
    const userName = data.userName;
    const email = data.email;

    bcrypt.hash(data.password1,15)
    .then(function(hash) {
        
        let newUser = new User({
            fullName : fullName,
            userName : userName,
            email : email,
            password : hash
        });

        

        newUser.save()
        .then(async (data) => {
            let portfolioId =  await inititiatePortFolio(data);
            console.log(portfolioId);
            if(portfolioId !== null) {
                console.log(portfolioId);
                await initializeWatchList(newUser._id);
            }
            return response.status(200).json({
                message: "New User Registered",
            })
        })
        .catch((error) => {
            return response.status(500);
        })
    });
}

module.exports = registerNewUser;