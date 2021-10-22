import apiV1Request from './api.v1.route'
import { getRefreshToken } from './../utils/getRefreshToken';


export const getFunds = async () =>
    await apiV1Request.post("/portfolio/getFund", {
        token : getRefreshToken()
    }).then((response) => {
        console.log("RESULT AYA HAIN", response)
        localStorage.setItem("funds",response.data.funds);
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN")
    })