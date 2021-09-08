const axios = require('axios');
const CSV2Json  = require('../utils/csvTojson');
const StockSymbolData = require('../symbl');
const get_quote_url = 'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?'
const stocks_csv_url = 'http://www1.nseindia.com/content/equities/EQUITY_L.csv'
const top_gainer_url = 'http://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json'
const top_loser_url = 'http://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json'
const top_fno_gainer_url = 'https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/fnoGainers1.json'
const top_fno_loser_url = 'https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/fnoLosers1.json'
const advances_declines_url = 'http://www1.nseindia.com/common/json/indicesAdvanceDeclines.json'
const index_url="http://www1.nseindia.com/homepage/Indices1.json"
const bhavcopy_base_url = "https://www1.nseindia.com/content/historical/EQUITIES/%s/%s/cm%s%s%sbhav.csv.zip"
const bhavcopy_base_filename = "cm%s%s%sbhav.csv"
const active_equity_monthly_url = "https://www1.nseindia.com/products/dynaContent/equities/equities/json/mostActiveMonthly.json"
const year_high_url = "https://www1.nseindia.com/products/dynaContent/equities/equities/json/online52NewHigh.json"
const year_low_url = "https://www1.nseindia.com/products/dynaContent/equities/equities/json/online52NewLow.json"
const preopen_nifty_url = "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/nifty.json"
const preopen_fno_url = "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/fo.json"
const preopen_niftybank_url = "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/niftybank.json"
const fno_lot_size_url = "https://www1.nseindia.com/content/fo/fo_mktlots.csv"

const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Host': 'www1.nseindia.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
        'X-Requested-With': 'XMLHttpRequest'
}


const getStockCodes = (request, response) => {
    // console.log(StockSymbolData);
    response.status(200).json(StockSymbolData);
}


const getTopGainer = (request, response) => {
    // console.log("hello top gainer")
    axios.get(top_gainer_url).then((data)=> {
        // console.log("good job")
        // console.log(data.data.data);
        return response.status(200).json(data.data.data);
    }).catch((error) => {
        // console.log("error detected")
        // console.log(error);

        return response.status(200).json(data.data.data);
    });
}

const getTopLooser = (request, response) => {
    // console.log("hello top gainer")
    axios.get(top_loser_url).then((data)=> {
        // console.log("good job")
        // console.log(data.data.data);
        return response.status(200).json(data.data.data);
    }).catch((error) => {
        // console.log("error detected")
        // console.log(error);

        return response.status(200).json(data.data.data);
    });
}

module.exports = {
    getStockCodes,
    getTopGainer,
    getTopLooser,
}

