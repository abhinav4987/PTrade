import React from 'react'
import StockSlab from '../../WatchlistStockSlab'
import './style.css'

function StockSlabsDisplay({changeSymbl,data,index,refetchWatchList}) {
    
    return (
        <div className="StockSlabsDisplay">
            <div>
                {
                    data?
                        data.map((stocksData) => (
                            <StockSlab refetchWatchList={refetchWatchList} changeSymbl={changeSymbl} data={stocksData} index={index}/>
                        )) : null
                }
            </div>

            <div className="divFill">.</div>
        </div>
    )
}

export default StockSlabsDisplay

