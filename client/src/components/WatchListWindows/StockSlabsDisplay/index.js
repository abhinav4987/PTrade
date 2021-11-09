import React from 'react'
import StockSlab from '../../WatchlistStockSlab'
// import NoStocks from './Nostocks';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import {FaMoneyBillWave} from 'react-icons/fa';
import './style.css'

function StockSlabsDisplay({changeSymbl,data,index,refetchWatchList, buyOpen, sellOpen}) {
    
    return (
        <div className="StockSlabsDisplay">
       
            <div>
                {
                    data && data.length > 0?
                        data.map((stocksData) => (
                            
                            <StockSlab 
                                refetchWatchList={refetchWatchList} 
                                changeSymbl={changeSymbl} 
                                data={stocksData} 
                                index={index} 
                                buyOpen={buyOpen} 
                                sellOpen={sellOpen}
                            />
                            
                        )) : (
                            <div className="nostocksmessage">
                                <FaMoneyBillWave />
                                Add some Stocks
                            </div>
                        )
                }
            </div>
            

            <div className="divFill">.</div>
        </div>
    )
}

export default StockSlabsDisplay

