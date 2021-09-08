import React from 'react'
import {BsArrowUpLeft, BsArrowDownRight} from 'react-icons/bs'
import Buy from '../Buttons/Buy';
import Sell from '../Buttons/Sell';
import Remove from '../Buttons/Remove';
import './style.css'

function PortfolioStockSlab({data}) {
    
    let currentPriceClassName = data.loss ? "portfolioStockSlab_price redStock" : "portfolioStockSlab_price greenStock";
    let stockSymbolClassName = data.loss ? "portfolioStockSlab_symbol redStock" : "portfolioStockSlab_symbol greenStock";
    
    
    return (
        <div className="portfolioStockSlab_main">
            <div className="portfolioStockSlab_layer1" id="">

                <span className={stockSymbolClassName}>{data.symbol}</span>
                <div className="fillSpace"></div>
                <span className="percentage_change">{data.changePercentage}%</span>
                {
                    data.loss ?
                        <BsArrowDownRight className="redStock" /> :
                        <BsArrowUpLeft className="greenStock" />
                }
                <span className={currentPriceClassName}>{data.CurrentPrice}</span>
                
            </div>

            <div className="portfolioStockSlab_layer2">
                <div className="fillSpace"></div>
                <Buy illustration="Buy"/>
                <Sell illustration="Sell"/>
            </div>
        </div>
    )
}

export default PortfolioStockSlab
