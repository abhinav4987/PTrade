import React from 'react'
import GlobalInfo from './GlobalInfo'
import StockDetailWindow from './StockDetailWindow';
import './style.css'

function PortfolioDetailWindow() {
    return (
        <div className="portfolioDetailWindow_main">
            <div className="portfolio_welcomeNote">
                Hello User
                <div className="felx-fill"></div>
                    <span className="portfolio-funds">Funds : {localStorage.getItem("funds")}</span>
                </div>
            <GlobalInfo />
            <StockDetailWindow />
        </div>
    )
}

export default PortfolioDetailWindow; 
