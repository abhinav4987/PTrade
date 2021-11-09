import React,{useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import {getFundamentals} from '../../../routes/yFinance.routes'
import {sellLimit, sell} from '../../../routes/portfolioStocks.routes'
import './style.css';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import { updatePortfolio } from '../../../routes/portfolio.routes';

function SellBox({symbl,open, price, closeFun}) {
    
    const [quantity, setQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(price);
    const [netCost, setNetCost] = useState(stockPrice*quantity);
    const [sellLim, setSellLim] = useState(0);
    const [className, setClassName] = useState(
        open === true ? "buyBox_main" : "buyBox_main closed"
    );


    const funds = localStorage.getItem("funds");

    useEffect(() => {
        setNetCost((stockPrice)*(quantity));
        // console.log(quantity, " ",stockPrice.replace(",",""));
    },[quantity,stockPrice]);

    useEffect(() => {
        setClassName(open === true ? "buyBox_main" : "buyBox_main closed");
    },[open]);

    const close = () => {
        setClassName("buyBox_main closed");
        closeFun(false);
    }
    useEffect(()=>{
        sellLimit(symbl).then((data) => {
            setSellLim(data)

            console.log("itna bechna hain")
        }).catch((error) => {
            setSellLim(0);
        })
    },[symbl,open]);


    useEffect(()=>{
        if(symbl !== "ABC")
        getFundamentals(symbl).then((data) => {
            setStockPrice(parseFloat(data.lastPrice.replace(",","")));
        });
    },[symbl]);

    useEffect(()=> {
        console.log("sell limit : ",sellLim);

    },[sellLim]);

    const changeQuantity = (e) => {
        if(e.target.value <= sellLim) {

            setQuantity(e.target.value);
            setNetCost((e.target.value*stockPrice).toFixed(2))
            // setQuantity(e.target.value);
            // console.log(quantity, " ",parseFloat(stockPrice.replace(",","")));
            // setNetCost(parseFloat(stockPrice.replace(",",""))* (quantity));
            // console.log(netCost);

        } else {
            setQuantity(sellLim);
            setNetCost(stockPrice*sellLim);
        }
    }

    const sellStocks = () => {
        if(quantity > 0) {

            sell(symbl, quantity, stockPrice).then(data => {
                closeFun(false);
            })
        }
    }
    return (
        <div className={className}>
            <SlideFade 
                direction="top"
                in={open}
                transition={{ enter: { duration: 0.4, delay: 0.5 } }}
            >
            <div className="sellBox_head">
                SELL<span className="HEAD_SYMBOL">{symbl}</span> <span className="exchangeName">NSE</span>x {quantity} Qty
            </div>
            <div className="sellBox_body">   
                <div className="sellBox_body_top">
                <div className="textField_floor1">    
                    <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        value={quantity}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={changeQuantity}
                        variant="outlined"
                        className="textField_floor1"
                    />
                </div>
                <div className="textField_floor1">        
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Price"
                        value={stockPrice}
                        variant="outlined"
                        className="textField_floor1"
                    />
                </div>
                </div>
                <div className="sellBox_body_bottom">
                    <div className="textField_floor2">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Net Cost"
                            value={netCost}
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className="sellBox_buttons">
                    <button className="sellBox_Sell" onClick={sellStocks} type="button">
                        Sell
                    </button>
                    <button className="sellBox_Cancel" onClick={close}>
                        Cancel
                    </button>
                </div>
            </div>
            </SlideFade>
        </div>
    )
}

export default SellBox

// net quantity
// price
// net worth