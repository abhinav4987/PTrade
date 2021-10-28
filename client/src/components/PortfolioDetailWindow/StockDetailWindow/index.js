import React, {useState, useEffect} from 'react'
import {getFundamentals} from '../../../routes/yFinance.routes'
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
                        <span className="detailTitle">Quantity</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                            Number or volume of shares being transacted
                            </span>
                            <span className="detailValue">{display.quantity.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="detailBox">
                        <span className="detailTitle">Value</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                                Net value of the stocks owned.
                            </span>
                            <span className="detailValue">{value.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="detailRow">
                <div className="detailBox">
                    <span className="detailTitle">Average Cost Price</span>
                    <div className="detail">
                        <span className="detailBoxInfo">
                            Cost of a single stock owned by you.
                        </span>
                        <span className="detailValue">{(display.totalInvestment/display.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <div className="detailBox">
                    <span className="detailTitle">Current   Market Price</span>
                    <div className="detail">
                        <span className="detailBoxInfo">
                            Market price of the stock.
                        </span>
                        <span className="detailValue">{currentPrice}</span>
                    </div>
                </div>
                </div>
                <div className="detailRow">
                    <div className="detailBox">
                        <span className="detailTitle">Unrealised Profit</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                                Profit gained from your transactions.
                            </span>
                            <span className="detailValue">{(value - display.totalInvestment).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="controls">
                        <button className="showCharts showDetail_button">Charts</button>
                        <div className="detailwindow_buySell">
                            <button className="detailWindow__buy showDetail_button">Buy</button>
                            <button className="detailWindow__sell showDetail_button">Sell</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

<span className="detailBoxInfo">
    Some Info about the slot. 
    Telling what this slot tells about
</span>

// 
export default StockDetailInfo 
