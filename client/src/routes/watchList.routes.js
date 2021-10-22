import apiV1Request from './api.v1.route'
import { getRefreshToken } from './../utils/getRefreshToken';
// import {processWatchListArray}
import { processWatchListArray } from './../utils/processWatchListArray';


export const getAllWatchList = async () =>   
    await apiV1Request.post("/watchList/getAll", {
        token : getRefreshToken()
    }).then((response) => {
        // console.log("watchList data aya ", response.data);
        return processWatchListArray(response.data);
    }).catch((error) => {
        // console.log("error aya");
})

export const addSymbl = async (symbl, index) => 
    await apiV1Request.post("/watchList/addSymbl", {
        token : getRefreshToken(),
        symbol : symbl,
        index: index
    }).then((response) => {
        // console.log("Symbol Added");
    }).catch((error) => {
        console.log();
    });


export const removeSymbl = async (symbl, index) => 
    await apiV1Request.post("/watchList/removeSymbl", {
        token: getRefreshToken(),
        symbol: symbl,
        index: index
    }).then((response) => {
        // console.log("symbol removed");
    }).catch((error) => {
        console.log();
    })

