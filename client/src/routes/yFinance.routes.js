import apiV1Request from './api.v1.route'

export const getHistory =  (data) => 
    apiV1Request.post("/yfinance/getHistory/" + data.symbl,  
    {       
            interval : data.interval,
            period : data.period
    }
    ).then((data) => {
        // console.log(data.data.result);
        return data.data.result;
    }).catch((error) => {
        console.log(error);
        return null;
    })


export const getFundamentals = (symbl) =>
    apiV1Request.post("yfinance/getFundamentals/"+symbl)
        .then((data) => {
            // console.log("FUNDAMENTAL ",data);
            return data.data.result;
        }).catch((error) => {
            return null;
        })



// {
//     "AMY" = " I just do it for fun";
// }