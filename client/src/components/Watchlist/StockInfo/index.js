import React, {useState} from 'react'
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css'


const dummyData = {
    totalTradedVolume : "23,234",
    open : "1,345",
    lastPrice : "12,342",
    faceValue : "10"
}; 

function StockInfo({data,index}) {
    console.log("stock data ", data);
    
    
    return (
        <div className="watchListStockInfo">

            <SlideFade
            direction="top"
            in={true}
            transition={{ enter: { duration: 0.4, delay: 0.7 } }}
            >
            <div className="info_Attribute">
                    <span className="attribute_block bottomBorder">
                        Volume
                    </span>
                    <span className="attribute_block bottomBorder">
                        Open Price
                    </span>
                    <span className="attribute_block bottomBorder">
                        Previous Close
                    </span>
                    <span className="attribute_block bottomBorder">
                        Face Value
                    </span>
                    <span className="attribute_block ">
                        P/E Ratio
                    </span>
                    
            </div>
            </SlideFade>
            <SlideFade
            direction="top"
            in={true}
            transition={{ enter: { duration: 0.4, delay: 0.7 } }}
            >
            <div className="info_value">
                    <span className="value_block bottomBorder">
                        {data ? data.totalTradedVolume : dummyData.totalTradedVolume}
                    </span>
                    <span className="value_block bottomBorder">
                        {data ? data.open : dummyData.open}
                    </span>
                    <span className="value_block bottomBorder">
                        {data ? data.lastPrice : dummyData.lastPrice}
                    </span>
                    <span className="value_block bottomBorder">
                        {data ? data.faceValue : dummyData.faceValue}
                    </span>
                    <span className="value_block ">
                        23.12
                    </span>
                    
            </div>
            </SlideFade>
        </div>
    )
}

export default StockInfo
