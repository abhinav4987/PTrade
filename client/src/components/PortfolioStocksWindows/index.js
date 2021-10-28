import React from 'react'
import PortfolioStockSlab from '../PortFolioStockSlab';
import {FaMoneyBillWave} from 'react-icons/fa';
import './style.css'








function PortfolioStocksWindows({data, changeSymbl, setCurrPrice, buyOpen, sellOpen}) {
    
    console.log(data);
    const stockList = data.map((stock) => (
        <PortfolioStockSlab changeSymbl={changeSymbl} data={stock} setCurr={setCurrPrice} buyOpen={buyOpen} sellOpen={sellOpen} />
    ))
    return (
        <div className="portfolioStocksWindows">
            <div className="portfolioStocks_header">YOUR STOCKS</div>
            <div className="portfolioStocks_stockList">
                {data.length > 0 ? (stockList) : (
                    <div className="nostocksmessage">
                    <FaMoneyBillWave />
                    Buy some Stocks
                    </div>
                )}
            </div>
            <div className="divFill">.</div>
        </div>
    )
}


export default PortfolioStocksWindows
