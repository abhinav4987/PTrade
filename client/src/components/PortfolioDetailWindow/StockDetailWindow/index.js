import React, {useState, useEffect} from 'react'
import {getFundamentals} from '../../../routes/yFinance.routes'
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css'



function StockDetailInfo({symbl, data}) {

    const [display, setDisplay] = useState({
        quantity: 0,
        totalInvestment: 0,
    });
    const [value, setValue] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        console.log("symbol changed to ", symbl);
        if(symbl !== "ABC")
        getFundamentals(symbl).then((dataa) => {
            console.log("I recieved this data : ", dataa)
            if(symbl !== "ABC") {
                for(let i =0;i< data.length;i++) {
                    if(data[i].symbl === symbl) {
                        console.log("inserting data : ", data[i]);
                        setDisplay(data[i]);
                    }
                }
            }
            setCurrentPrice(parseFloat(dataa.lastPrice.replace(",","")))
        });
    }, [symbl]);

    useEffect(() => {
        if(symbl !== "ABC" && currentPrice !== 0) {
            setValue(currentPrice*display.quantity);
        }
    },[ currentPrice])

    return (
        <div className="StockDetailInfo">
            <div className="stockSymbol">{symbl}</div>
            <div className="stcokDetail">
                <div className="detailRow">
                    <div className="detailBox">
                        <span className="detailTitle">
                        <SlideFade
                            direction="top"
                            in={true}
                            transition={{ enter: { duration: 1, delay: 0.2 } }}
                        >
                        Quantity
                        </SlideFade>
                        </span>
                    
                        <div className="detail">
                        
                            <span className="detailBoxInfo">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            Number or volume of shares being transacted
                            </SlideFade>
                            </span>
                        
                           
                            <span className="detailValue">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            > 
                            {display.quantity.toFixed(2)}
                            </SlideFade>
                            </span>
                        
                        </div>
                    </div>
                    <div className="detailBox">
                        <span className="detailTitle">Value</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                                Net value of the stocks owned.
                            </SlideFade>
                            </span>
                            <span className="detailValue">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            {value.toFixed(2)}
                            </SlideFade>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="detailRow">
                <div className="detailBox">
                    <span className="detailTitle">
                    <SlideFade
                        direction="top"
                        in={true}
                        transition={{ enter: { duration: 1, delay: 0.2 } }}
                    >
                    Average Cost Price
                    </SlideFade>
                    </span>
                    <div className="detail">
                        <span className="detailBoxInfo">
                        <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                        >    
                        Cost of a single stock owned by you.
                        </SlideFade>
                        </span>
                        <span className="detailValue">
                        <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                        >
                        {(display.totalInvestment/display.quantity).toFixed(2)}
                        </SlideFade>
                        </span>
                    </div>
                </div>
                <div className="detailBox">
                    <span className="detailTitle">
                    <SlideFade
                        direction="top"
                        in={true}
                        transition={{ enter: { duration: 1, delay: 0.2 } }}
                    >
                    Current   Market Price
                    </SlideFade>
                    </span>
                    <div className="detail">
                        <span className="detailBoxInfo">
                        <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >    
                        Market price of the stock.
                        </SlideFade>
                        </span>
                        <span className="detailValue">
                        <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                        {currentPrice}
                        </SlideFade>
                        </span>
                    </div>
                </div>
                </div>
                <div className="detailRow">
                    <div className="detailBox">
                        <span className="detailTitle">
                        <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                        Unrealised Profit
                        </SlideFade>
                        </span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                                Profit gained from your transactions.
                            </SlideFade>
                            </span>
                            <span className="detailValue">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            {(value - display.totalInvestment).toFixed(2)}
                            </SlideFade>
                            </span>
                        </div>
                    </div>
                    
                    <div className="controls">
                    
                        <button className="showCharts showDetail_button">
                        <SlideFade
                            direction="top"
                            in={true}
                            transition={{ enter: { duration: 1, delay: 0.2 } }}
                        >
                        Charts
                        </SlideFade>
                        </button>
                        <div className="detailwindow_buySell">
                            <button className="detailWindow__buy showDetail_button">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            Buy
                            </SlideFade>
                            </button>
                            <button className="detailWindow__sell showDetail_button">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            Sell
                            </SlideFade>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

// <span className="detailBoxInfo">
//     Some Info about the slot. 
//     Telling what this slot tells about
// </span>

// 
export default StockDetailInfo 
