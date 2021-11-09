import React from 'react'
import {FaMoneyBillWave} from 'react-icons/fa'
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css'

function InfoSlab({title, value}) {
    return (
        <div className="infoSlab_main">
            <div className="infoSlab_title">
            <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 1, delay: 0.2 } }}
            >
                <span>NET WORTH</span> <FaMoneyBillWave className="infoIcon" />
            </SlideFade>
            </div>
            <div className="infoSlab_networth_value">
            <SlideFade
                direction="top"
                in={true}
                transition={{ enter: { duration: 1, delay: 0.2 } }}
            >
                $ {value}
            </SlideFade>
            </div>
        </div>
    )
}

export default InfoSlab 
