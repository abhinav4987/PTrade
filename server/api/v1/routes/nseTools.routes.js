const express = require('express');
const nseToolService = require('../services/nseTool.services');
var router = express.Router();


router.get("/getStockCodes",nseToolService.getStockCodes);
router.get("/getTopGainer",nseToolService.getTopGainer);
router.get("/getTopLooser",nseToolService.getTopLooser);


module.exports = router;