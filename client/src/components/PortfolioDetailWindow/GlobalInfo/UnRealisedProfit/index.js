import React from 'react'
import {GiReceiveMoney} from 'react-icons/gi'
import './style.css'

function InfoSlab({title}) {
    return (
        <div className="infoSlab_main">
            <div className="infoSlab_title">
                UNREALISED PROFIT <GiReceiveMoney className="infoIcon" />
            </div>
            <div className="infoSlab_unrealisedProfit_value">
                $34535
            </div>
        </div>
    )
}

export default InfoSlab 
