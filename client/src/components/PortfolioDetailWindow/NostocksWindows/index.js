import React from 'react'
import {RiBankCardFill} from 'react-icons/ri';
import './style.css'


function NoStocksWindow() {
    return (
        <div className="Nostocks">
            <RiBankCardFill />
            <h2>No Stocks Owned</h2>
        </div>
    )
}

export default NoStocksWindow
