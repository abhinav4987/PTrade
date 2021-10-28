import React, {useState, useEffect}  from 'react'
import GlobalInfo from './GlobalInfo'
import StockDetailWindow from './StockDetailWindow';
import NoStocksWindow from './NostocksWindows'
import {getPortfolio} from '../../routes/portfolio.routes'
import './style.css'



function PortfolioDetailWindow({symbl,data,priceList}) {
    
    
    console.log("humara data ", data , " ", priceList);
    const [portfolio, setPortfolio] = useState({
        equityInvestment: 0,
        netWorth: 0,
        unrealisedProfit: 0
    });
    useEffect(() => {
        getPortfolio().then((data) => {
            console.log("humara portfolio : ", data);
            setPortfolio(data);
        })
    },[]);

    return (
        <div className="portfolioDetailWindow_main">
            <div className="portfolio_welcomeNote">
                Hello User
                <div className="felx-fill"></div>
                <span className="portfolio-funds">Funds : {parseFloat(localStorage.getItem("funds")).toFixed(2)}</span>
            </div>

            <GlobalInfo data={data} priceList={priceList} portfolio={portfolio} />
            <div className="midData">
                {
                    data.length > 0 && data[0].symbol !== "FAKE" ? (
                        <StockDetailWindow symbl={symbl} data={data} />
                    ) : (
                        <NoStocksWindow />
                    )
                }
            </div>
            <div className="dummy_element">.</div>
        </div>
    )
}

export default PortfolioDetailWindow; 
