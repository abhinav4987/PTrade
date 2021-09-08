const express = require('express');
var router = express.Router();
const yFinService = require('../services/yFinance.services');




router.post("/getHistory/:symbl", yFinService.getHistory);
router.post("/getFundamentals/:symbl",yFinService.getFundamentals);
module.exports = router     