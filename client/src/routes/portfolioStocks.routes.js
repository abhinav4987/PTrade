import apiV1Request from './api.v1.route'
import { getRefreshToken } from './../utils/getRefreshToken';

export const getAllStocks = async () =>
    await apiV1Request.post("/portfolioStocks/getAll", {
        token : getRefreshToken()
    }).then((response) => {
        console.log("owned Stocks", response);
        return response.data;
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN")
    })

export const buy = async (symbl, quantity, price) => 
    await apiV1Request.post("/portfolioStocks/buy", {
        token : getRefreshToken(),
        symbl: symbl,
        quantity: quantity,
        cost: price
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });


export const sell = async (symbl, quantity, price) => 
    await apiV1Request.post("/portfolioStocks/sell", {
        token : getRefreshToken(),
        symbl: symbl,
        quantity: quantity,
        cost: price
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });

export const sellLimit = async (symbl) => 
    await apiV1Request.post("/portfolioStocks/getSellLimit", {
        token: getRefreshToken(),
        symbl: symbl,
    }).then((response)=> {
        if(response.data.result) {
            return response.data.result
        } else {
            return 0;
        }
    }).catch((error) => {
        return 0;
    });