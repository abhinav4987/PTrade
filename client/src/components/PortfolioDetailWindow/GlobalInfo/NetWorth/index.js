import React from 'react'
import {FaMoneyBillWave} from 'react-icons/fa'
import './style.css'

function InfoSlab({title}) {
    return (
        <div className="infoSlab_main">
            <div className="infoSlab_title">
                <span>NET WORTH</span> <FaMoneyBillWave className="infoIcon" />
            </div>
            <div className="infoSlab_networth_value">
                $67574
            </div>
        </div>
    )
}

export default InfoSlab 
