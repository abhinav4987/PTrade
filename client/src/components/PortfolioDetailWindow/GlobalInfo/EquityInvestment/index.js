import React from 'react'
import {FaPiggyBank} from 'react-icons/fa'
import './style.css'

function InfoSlab({title, value}) {
    return (
        <div className="infoSlab_main">
            <div className="infoSlab_title">
                EQUITY INVESTMENT <FaPiggyBank className="infoIcon"/>
            </div>
            <div className="infoSlab_equityInvestment_value">
                $ {value}
            </div>
        </div>
    )
}

export default InfoSlab 
