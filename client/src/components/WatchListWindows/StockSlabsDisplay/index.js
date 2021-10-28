import React from 'react'
import StockSlab from '../../WatchlistStockSlab'
import './style.css'

function StockSlabsDisplay({changeSymbl,data,index,refetchWatchList, buyOpen, sellOpen}) {
    
    return (
        <div className="StockSlabsDisplay">
            <div>
                {
                    data?
                        data.map((stocksData) => (
                            <StockSlab 
                                refetchWatchList={refetchWatchList} 
                                changeSymbl={changeSymbl} 
                                data={stocksData} 
                                index={index} 
                                buyOpen={buyOpen} 
                                sellOpen={sellOpen}
                            />
                        )) : null
                }
            </div>

            <div className="divFill">.</div>
        </div>
    )
}

export default StockSlabsDisplay

