const express = require('express');
const SignUpValidation =  require('../validations/signup.validations');
const User =  require('../models/user.model');
const hashPassword =  require('../utils/hashPassword');
const userService = require('../services/user.services');
var router = express.Router();


router.post('/signUp',userService.registerUser);

router.post('/login',userService.loginUser);

router.get('/hello',(req, res) => {
    return res.status(200).json({
        message: "hello world"
    })
})

module.exports = router;
