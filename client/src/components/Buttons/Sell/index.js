import React from 'react'
import './style.css'
import '../style.css'

function Sell({illustration}) {
    return (
        <div className="SellButton">
            <div className="SellIllustrationPart">
                {illustration}
            </div>
            
            <button className="sellButtonPart">
                S
            </button>
        </div>
    )
}

export default Sell

