import React from 'react'
import './style.css'
import '../style.css'

function Buy({illustration}) {
    return (
        <div className="BuyButton">
            <div className="BuyIllustrationPart">
                {illustration}
            </div>
            
            <button className="buyButtonPart">
                B
            </button>
        </div>
    )
}

export default Buy
