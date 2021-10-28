const axios =require("axios");
const extractChartData = require("../utils/extractChartData");
var puppeteer = require('puppeteer');
var API = require('indian-stock-exchange');
const base_url = "https://query2.finance.yahoo.com";
const scrape_url = "https://finance.yahoo.com/quote/";

user_agent_headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
var NSEAPI = API.NSE;

const getHistory = (request, response) => {

    let symbl = request.params.symbl+".NS";
    const request_url = base_url + "/v8/finance/chart/" + symbl;
    // console.log(request);
    axios(request_url,{
        params : {
            interval : request.body.interval,
            events : "div,splits",
            range : request.body.period,
        },
        headers : user_agent_headers
    }).then((data) => {
        // console.log(data);
        const result = extractChartData(data.data);
        return response.status(200).json({
            result : result
        })
    }).catch((error) => {
        // console.log(error)
        return response.status(400).json({
            result : "error occured"
        })
        
    });
}


const getFundamentals = async (request, response) => {

    let symbl = request.params.symbl;
    try {
        NSEAPI.getQuoteInfo(symbl).then((data) => {
            // console.log(data.data);
            return response.status(200).json({
                result: data.data.data[0]
            })
        }) 

    } catch(error) {
        return response.status(500);
    }
    
}

const getFundamentalUtil =  async (symbl) => 
    await NSEAPI.getQuoteInfo(symbl).then((data) => {
            // console.log("aapne yeh manga tha: ",data.data.data[0]);
            return data.data.data[0]
        }) 

    



module.exports = {
    getHistory,
    getFundamentals,
    getFundamentalUtil
};