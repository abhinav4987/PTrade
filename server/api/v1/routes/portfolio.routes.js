const express = require("express");
const PortFolio = require("../models/portfolio.model");
const service = require("../services/portfolio.services");
var router = express.Router();

router.post("/getFund",service.getFunds);
router.post("/getPortfolio",service.getPortFolio);
router.post("/update", service.update);

module.exports = router