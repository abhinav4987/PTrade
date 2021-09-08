import React from 'react'
import './style.css'



function StockDetailInfo() {
    return (
        <div className="StockDetailInfo">
            <div className="stockSymbol">UVEW</div>
            <div className="stcokDetail">
                <div className="detailRow">
                    <div className="detailBox">
                        <span className="detailTitle">Quantity</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                            Number or volume of shares being transacted
                            </span>
                            <span className="detailValue">98K</span>
                        </div>
                    </div>
                    <div className="detailBox">
                        <span className="detailTitle">Value</span>
                        <div className="detail">
                            <span className="detailBoxInfo">
                                Net value of the stocks owned.
                            </span>
                            <span className="detailValue">6.M</span>
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
                        <span className="detailValue">657.3K</span>
                    </div>
                </div>
                <div className="detailBox">
                    <span className="detailTitle">Current   Market Price</span>
                    <div className="detail">
                        <span className="detailBoxInfo">
                            Market price of the stock.
                        </span>
                        <span className="detailValue">563.3K</span>
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
                            <span className="detailValue">38.12K</span>
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
