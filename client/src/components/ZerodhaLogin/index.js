import React from 'react'
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { SetKiteRequestToken } from './../../utils/setKiteRequestToken';
import { getKiteSession } from './../../routes/zerodhaAPI.route';


function ZerodhaLogin() {
    

    let history = useHistory();
    const queryParams = new URLSearchParams(window.location.search);
    const request_token = queryParams.get('request_token');
    SetKiteRequestToken(request_token);
    getKiteSession();
    history.push("/dashboard");
    
    return (
        <div>hello </div>
    )
}

export default ZerodhaLogin
