const PortFolioStock = require("../models/portfolioStock.model");
const portfolioStockService = require("../services/portfolioStocks.services");
var router = express.Router();

router.post("/buy",portfolioStockService.buy);
router.post("/sell",portfolioStockService.sell);
router.posst("/getAll",portfolioStockService.getAll);

router.post("/getSellLimit", portfolioStockService.getSellLimit);


module.exports = router