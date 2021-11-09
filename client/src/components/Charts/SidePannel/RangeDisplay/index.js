import React,{useState, useEffect} from 'react'
import './style.css';

function RangeDisplay({low, high, current}) {
    const position = ((high - current)/(high - low)) * 100; 
    // const position = 20;
    
    return (
        <div className="rangeDisplay">
            <div>
                <span>{low}</span>
                <span>{high}</span>
            </div>
            <div>
                <div className="rangeBar"></div>
                <div className="pointer" style={{
                    left : `${position}%`,
                }}></div>
            </div>
            <div>
                <span>L</span>
                <span>H</span>
            </div>
        </div>
    )
}

export default RangeDisplay
