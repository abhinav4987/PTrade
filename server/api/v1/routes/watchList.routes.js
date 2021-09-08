const express = require('express');

const User =  require('../models/user.model');
const WatchList = require('../models/watchList.model');
const hashPassword =  require('../utils/hashPassword');
const userService = require('../services/user.services');
const watchListService = require("../services/watchList.services");
var router = express.Router();


router.post("/getAll",watchListService.getAllWatchList);
router.post("/addSymbl",watchListService.addSymbl);
router.post("/removeSymbl",watchListService.removeSymbl);

module.exports = router;
