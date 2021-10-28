import React from 'react'
import './style.css'
import '../style.css'


function Buy({illustration,open}) {
    
    const onClick = () => {
        console.log("kholud?")
        open(true);
    }

    return (
        <div className="BuyButton" onClick={onClick}>
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
