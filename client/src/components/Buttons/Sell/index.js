import React from 'react'
import './style.css'
import '../style.css'

function Sell({illustration,open}) {


    const onClick = () => {
        open(true);
        console.log("kholdu?")
    }

    return (
        <div className="SellButton" onClick={onClick}>
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

