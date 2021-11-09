import React, {useState, useEffect} from 'react'
import {BsArrowUpLeft, BsArrowDownRight} from 'react-icons/bs'
import Buy from '../Buttons/Buy';
import Sell from '../Buttons/Sell';
import Remove from '../Buttons/Remove';
import { getFundamentals } from '../../routes/yFinance.routes';
import { removeSymbl } from './../../routes/watchList.routes';
import './style.css';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"



// import csvTojson from '../../../../server/api/v1/utils/csvTojson';



// RELIANCE ICICIBANK

function StockSlab({data, 
    changeSymbl,
    index,
    refetchWatchList,
    buyOpen,
    sellOpen
}) {
    
    // console.log("watchListStock ",changeSymbl);
    let [currentPriceClassName, setOne] = useState("stockSlab_price redStock");
    let [stockSymbolClassName, setTwo] = useState("stockSlab_price greenStock");
    let [changePercentage, setThree] = useState(0);
    let [lastPrice, setLastPrice] = useState(1,908);
    let [loss, setLoss] = useState(false);
    useEffect(() => {
        console.log("fetching slab info ", data);
        getFundamentals(data).then((data) => {
            if(typeof data !== "undefined")
            {
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
    const onClick = () => {
        changeSymbl(data);
    };

    const remove = () => {
        console.log("arey hata raha huun yaar");
        removeSymbl(data,index);
        refetchWatchList();
    }
    
    return (
        <div className="stockSlab_main" onClick={onClick}>
        
            <div className="stockSlab_layer1" id="">
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                    <span className={stockSymbolClassName}>{data}</span>
                </SlideFade>

                <div className="fillSpace"></div>
                <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                    <span className="percentage_change">{changePercentage}%</span>
                {
                    loss ?
                        <BsArrowDownRight className="redStock" /> :
                        <BsArrowUpLeft className="greenStock" />
                }
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                    <span className={currentPriceClassName}>{lastPrice}</span>
                </SlideFade>    
            </div>

            <div className="stockSlab_layer2">
                <div className="fillSpace"></div>
                <Buy illustration="Buy" open={buyOpen}/>
                <Sell illustration="Sell" open={sellOpen}/>
                <div onClick={remove}><Remove illustration="Remove" remove={remove} /></div>
            </div>
        
        </div>
    )
}

// data.loss ? "stockSlab_price redStock" : "stockSlab_price greenStock";
// data.loss ? "stockSlab_symbol redStock" : "stockSlab_symbol greenStock";
export default StockSlab
