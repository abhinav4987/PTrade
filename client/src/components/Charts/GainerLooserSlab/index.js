import React, {useState} from 'react'
import './style.css'

function GainerLooser({symbl, price, getToken}) {
    
    // const []
    const onClick = () => {
        getToken(symbl);
    }
    return (
        <div className="gainerLooserSlab" onClick={onClick}>
            <span className="gainerLooser_symbl">{symbl}</span>
            <span className="gainerLooser_price">${price}</span>
        </div>
    )
}

export default GainerLooser
