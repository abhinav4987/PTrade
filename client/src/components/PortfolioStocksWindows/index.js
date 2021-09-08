import React from 'react'
import PortfolioStockSlab from '../PortFolioStockSlab';
import './style.css'

function PortfolioStocksWindows({data}) {
    
    console.log(data);
    const stockList = data.map((stock) => (
        <PortfolioStockSlab data={stock} />
    ))
    return (
        <div className="portfolioStocksWindows">
            <div className="portfolioStocks_header">YOUR STOCKS</div>
            <div className="portfolioStocks_stockList">
                {stockList}
            </div>
            <div className="divFill">.</div>
        </div>
    )
}


export default PortfolioStocksWindows
