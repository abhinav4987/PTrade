const express = require('express');
const kiteService = require('../services/kite.services')
var router = express.Router();


router.post('/setKiteAcess',kiteService);


module.exports = router;