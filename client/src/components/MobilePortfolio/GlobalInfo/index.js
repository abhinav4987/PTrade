import React from 'react';
import './style.css';


function GlobalInfo() {
    return (
        <div className="globaldata-mobile">
            <div className="globalLabel-columns">
                <span className="global-labels global-data-box">Net Worth</span>
                <span className="global-labels global-data-box">Unrealised Profit</span>
                <span className="global-labels global-data-box">Equity Investment</span>
                <span className="global-labels global-data-box no-bottom-border">Funds</span>
            </div>

            <div className="globalValue-columns">
                <span className="global-value global-data-box">$100</span>
                <span className="global-value global-data-box">$100</span>
                <span className="global-value global-data-box">$100</span>
                <span className="global-value global-data-box no-bottom-border">$1000</span>
            </div>
        </div>
    )
}

export default GlobalInfo