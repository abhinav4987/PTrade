import React, {useState, useEffect} from 'react'
import {BsArrowUpLeft, BsArrowDownRight} from 'react-icons/bs'
import Buy from '../Buttons/Buy';
import Sell from '../Buttons/Sell';
import Remove from '../Buttons/Remove';
import { getFundamentals } from '../../routes/yFinance.routes';
import './style.css'

function PortfolioStockSlab({data, changeSymbl, setCurr, buyOpen, sellOpen}) {
    
    let [currentPriceClassName, setOne] = useState("portfolioStockSlab_price redStock");
    let [stockSymbolClassName, setTwo] = useState("portfolioStockSlab_symbol redStock");
    const [symbl, setSymbl] = useState("ABC");
    let [changePercentage, setThree] = useState(0);
    
    let [lastPrice, setLastPrice] = useState(1,908);
    let [loss, setLoss] = useState(false);

    const onClick = () => {
        changeSymbl(symbl)
    }
    useEffect(() => {
        // console.log("fetching slab info ", data);
        if(data.symbl !== "ABC")
        setSymbl(data.symbl)
        getFundamentals(data.symbl).then((data) => {
            if(typeof data !== "undefined")
            {
                setCurr(parseFloat(data.lastPrice.replace(/,/g,"")));
                // console.log("fetched ", data, " ",parseFloat(data.lastPrice.replace(/,/g,"")), " - ",parseFloat(data.open.replace(/,/g,"")), " ",(parseInt(data.lastPrice.replace(/,/g,"")) - parseInt(data.open.replace(/,/g,""))));
                if(parseFloat(data.open.replace(/,/g,"")) < parseFloat(data.lastPrice.replace(/,/g,""))){
                    setOne("stockSlab_price greenStock");
                    setTwo("stockSlab_price greenStock");;
                    setLoss(false);
                } else {
                    setOne("stockSlab_price redStock");
                    setTwo("stockSlab_price redStock");
                    setLoss(true);
                }
                let percent = 
                    (
                        ( 
                            parseInt(data.lastPrice.replace(/,/g,"")) - parseInt(data.open.replace(/,/g,""))
                        )/ parseInt(data.open.replace(/,/g,""))
                         * 100
                        );
                if(!isNaN(percent)) {
                    setThree(percent.toFixed(2));
                }
                setLastPrice(data.lastPrice);
            }
        })
    },[data]);

    return (
        <div className="portfolioStockSlab_main" onClick={onClick}>
            <div className="portfolioStockSlab_layer1" id="">

                <span className={stockSymbolClassName}>{data.symbl}</span>
                <div className="fillSpace"></div>
                <span className="percentage_change">{changePercentage}%</span>
                {
                    loss ?
                        <BsArrowDownRight className="redStock" /> :
                        <BsArrowUpLeft className="greenStock" />
                }
                <span className={currentPriceClassName}>{lastPrice}</span>
                
            </div>

            <div className="portfolioStockSlab_layer2">
                <div className="fillSpace"></div>
                <Buy illustration="Buy" open={buyOpen}/>
                <Sell illustration="Sell" open={sellOpen}/>
            </div>
        </div>
    )
}

export default PortfolioStockSlab
