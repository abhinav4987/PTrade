import apiV1Request from './api.v1.route'

export const getStockCodes = async (data) => {
    await apiV1Request.get("/nseTool/getStockCodes").then((data) => {
        // console.log(data.data);
    }).catch((error) => {
        // console.log(error);
    })
}


export const getTopGainer = async (data) => 
    await apiV1Request.get("/nseTool/getTopGainer").then((data) => {
        // console.log(data.data);
        return data.data
    }).catch((error) => {
        return [];
    })



export const getTopLooser = async (data) => 
    await apiV1Request.get("/nseTool/getTopLooser").then((data) => {
        // console.log(data.data);
        return data.data;
    }).catch((error) => {
        console.log(error);
        return [];
    })


