import React from 'react'
import NetWorth from './NetWorth'
import UnrealisedProfit from './UnRealisedProfit'
import EquityInvestment from './EquityInvestment'
import './style.css'


function GlobalInfo() {

    return (
        <div className="GlobalInfo_main">
            <NetWorth title="NET WORTH"/>
            <UnrealisedProfit title="UNREALISED PROFIT"/>
            <EquityInvestment title="EQUITY INVESTMENT"/>
        </div>
    )
}



export default GlobalInfo
