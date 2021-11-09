import React, {useState, useEffect} from 'react'
import NetWorth from './NetWorth'
import UnrealisedProfit from './UnRealisedProfit'
import EquityInvestment from './EquityInvestment'
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css'


function GlobalInfo({data, priceList, portfolio}) {

    const [net, setNet] = useState(0);
    const [netInvestment, setNetInvestment] = useState(0);
    const [netUnrealisedProfit, setNetUnrealisedProfit] = useState(0);


    useEffect(() => {
        let total = 0
        let netInvest = 0;
        let unrealisedProfit = 0;
        let index = 0;
        for(let stocks in priceList) {

            total += stocks.lastPrice;
            netInvest += data.totalInvestment;

            let current_value = stocks.quantity * priceList[index];
            unrealisedProfit += (current_value - stocks.totalInvestment); 
        }
        setNetInvestment(netInvest);
        setNet(parseFloat(total) + parseFloat(localStorage.getItem("funds")));
        setNetUnrealisedProfit(unrealisedProfit);
    });
    
    return (
        <div className="GlobalInfo_main">
            <NetWorth title="NET WORTH" value={portfolio.netWorth.toFixed(1)}/>
            <UnrealisedProfit title="UNREALISED PROFIT"  value={portfolio.unrealisedProfit.toFixed(1)}/>
            <EquityInvestment title="EQUITY INVESTMENT" value={portfolio.equityInvestment.toFixed(1)}/>
        </div>
    )
}



export default GlobalInfo
