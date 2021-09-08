import React from 'react'
import TopNavBar from '../../Navbar/TopNavbar';
import WatchList from './../../Watchlist';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
// var yahooFinance = require('yahoo-finance');
import yahooFinance from 'yahoo-finance'
import { NseIndia } from "stock-nse-india";
import Portfolio from '../../PortFolio';
import Charts from './../../Charts/index';
import {data} from '../../../nrmte-v5rot'
import {
    getStockCodes,
    getTopGainer,
    getTopLooser
} from '../../../routes/nseTools.route'
import './style.css'
import { getInstrumets } from '../../../routes/zerodhaAPI.route';
import { get_stock_codes } from './../../../NSETools/index';


function UserDashBoard() {
    
    let { path, url } = useRouteMatch();
    const nseIndia = new NseIndia();
    console.log(data);

    const symbols = [];
    data.forEach((stock, idx) => (
        symbols.push({
            "S.No" :  idx,
            "SYMBL" : stock.Symbol,
            "Company" : stock['Company Name']
        })
    ))
    
    // getStockCodes();
    getTopGainer();
    getTopLooser();
    return (
        <div className="dashBoard_main">
        <TopNavBar />



            <Switch>
                <Route  path={`${path}/watchList`}>
                    <WatchList />
                </Route>
                <Route  path={`${path}/charts`}>
                    <Charts />
                </Route>
                <Route  path={`${path}/portfolio`}>
                    <Portfolio />
                </Route>
                <Route path="/" >
                    <Portfolio />
                </Route>
            </Switch>
        </div>
    )
}

export default UserDashBoard
