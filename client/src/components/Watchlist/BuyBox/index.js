import React,{useState, useEffect, Fragment} from 'react'
import TextField from '@material-ui/core/TextField';
import {getFundamentals} from '../../../routes/yFinance.routes'
import {buy} from '../../../routes/portfolioStocks.routes'
import {updatePortfolio} from '../../../routes/portfolio.routes'
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css';


function BuyBox({symbl,open, price, closeFun}) {
    
    console.log("Buying : ", symbl);

    const [quantity, setQuantity] = useState(1);
    const [netCost, setNetCost] = useState(price*quantity);
    const [stockPrice, setStockPrice] = useState(price);
    const [className, setClassName] = useState(
        open === true ? "buyBox_main" : "buyBox_main closed"
    );
    const funds = localStorage.getItem("funds");
    useEffect(()=> {
        console.log("new price : ", stockPrice);
        setStockPrice(price);
    },[price]);


    useEffect(() => {
        setNetCost(stockPrice*quantity);
    },[quantity,stockPrice]);

    const changeQuantity = (e) => {
        if(stockPrice*e.target.value <= funds) {
            setQuantity(e.target.value);
            setNetCost(stockPrice*quantity);
        } else {
            setQuantity(funds / stockPrice);
            setNetCost((stockPrice*(funds / stockPrice)).toFixed(2));
        }
    };


    useEffect(() => {
        setClassName(open === true ? "buyBox_main" : "buyBox_main closed");
    },[open]);
    const close = () => {
        setClassName("buyBox_main closed");
        closeFun(false);
    }
    
    const buyStock = async (e) => {
        buy(symbl, quantity, stockPrice).then(data => {
            closeFun(false);
        });
    };
    useEffect(()=>{
        if(symbl!=="ABC")
        getFundamentals(symbl).then((data) => {
            setStockPrice(parseFloat(data.lastPrice.replace(",","")));
        });
    },[symbl]);
    return (
        <Fragment >
        <div className={className}>
            <SlideFade in={open} offsetY="20px">
            <div className="buyBox_head">
                BUY<span className="HEAD_SYMBOL">{symbl}</span> <span className="exchangeName">NSE</span>x {quantity} Qty
            </div>
            <div className="buyBox_body">   
                <div className="buyBox_body_top">
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
                <div className="buyBox_body_bottom">
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
                <div className="buyBox_buttons">
                    <button className="buyBox_Buy" type="button" onClick={buyStock}>
                        Buy
                    </button>
                    <button className="buyBox_Cancel" onClick={close}>
                        Cancel
                    </button>
                </div>
            </div>
            </SlideFade>
        </div>
        </Fragment>
    )
}

export default BuyBox

// net quantity
// price
// net worth