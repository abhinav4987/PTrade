import {getKiteRequestToken} from '../utils/getKiteRequestToken'
import { SetKiteAccessToken } from '../utils/setKiteAccessToken';
var KiteConnect = require("kiteconnect").KiteConnect;
var kc = new KiteConnect({
	api_key: "rughyki6lgdsqswt"
})


const api_secret = "r5ng9n4k2ctwzkl1z1mmro2t7js6ges6";

export const getKiteSession = () => {
    
    kc.generateSession(getKiteRequestToken(), api_secret)
    .then(function(response) {
        console.log(response)
        SetKiteAccessToken(response.access_token);
        // init();
    })
    .catch(function(err) {
        console.log(err);
    })
}

export const getInstrumets = () => {
    
    kc.getInstruments(["NSE"]).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
    .catch(function(err) {
        console.log(err);
    })
}