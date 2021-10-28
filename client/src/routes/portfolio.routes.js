import apiV1Request from './api.v1.route'
import { getRefreshToken } from './../utils/getRefreshToken';


export const  getPortFolio = async () => {

}

export const getFunds = async () =>
    await apiV1Request.post("/portfolio/getFund", {
        token : getRefreshToken()
    }).then((response) => {
        console.log("RESULT AYA HAIN", response)
        localStorage.setItem("funds",response.data.funds);
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN")
    })


export const getPortfolio = async () =>
    await apiV1Request.post("/portfolio/getPortfolio", {
        token : getRefreshToken()
    }).then((response) => {
        // console.log("RESULT AYA HAIN", response)
        return response.data.result
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN");
    })
    
export const updatePortfolio = async (amount) => 
    await apiV1Request.post("/portfolio/update", {
        token : getRefreshToken(),
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });