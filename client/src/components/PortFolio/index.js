import React, {useState} from 'react'
import PortfolioStocksWindows from '../PortfolioStocksWindows'
import PortfolioDetailWindow from './../PortfolioDetailWindow/index';
import MobilePortfolio from '../MobilePortfolio'
import './style.css';



const ownedStock = [
        {
            symbol: '   FEGG',
            changePercentage: 12,
            CurrentPrice: 875333,
            loss: false
        },
        {
            symbol: 'ABC',
            changePercentage: 20,
            CurrentPrice: 389953,
            loss: true,
        },
        {
            symbol: 'JEAC',
            changePercentage: 9,
            CurrentPrice: 1234,
            loss: false
        },
        {
            symbol: 'OFWU',
            changePercentage: 12,
            CurrentPrice: 87572,
            loss: false
        },
        {
            symbol: 'MIVY',
            changePercentage: 12,
            CurrentPrice: 1234,
            loss: true,
        },
        {
            symbol: 'PIWF',
            changePercentage: 43,
            CurrentPrice: 298784,
            loss: false
        },
        {
            symbol: 'ACEH',
            changePercentage: 11,
            CurrentPrice: 2484,
            loss: false
        },
        {
            symbol: 'RGIOW',
            changePercentage: 6,
            CurrentPrice: 1285,
            loss: true,
        },
        {
            symbol: 'URGR',
            changePercentage: 9,
            CurrentPrice: 662,
            loss: false
        },
]



function Portfolio() {
    
    const [StockIndex, setStockIndex] = useState(0);
    const changeIndex = (index) => {
        setStockIndex(index);
    }

    return (
        <div className="portfolio_main">
            <div className="desktop-portfolio">
                <PortfolioStocksWindows data={ownedStock} />
                <PortfolioDetailWindow />
            </div>
            <div className="mobile-portfolio">
                <MobilePortfolio /> 
            </div>
        </div>
    )
}

export default Portfolio


