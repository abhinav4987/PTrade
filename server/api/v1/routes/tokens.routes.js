const express = require('express');
const tokenService = require('../services/token.services')
var router = express.Router();



router.post('/newAccess',tokenService.newAccessToken);

router.post('/newRefresh',tokenService.newRefreshToken);

router.post('/deleteRefresh',tokenService.removeRefreshToken);


module.exports = router;
