import React from 'react'
import StockSlab from '../../WatchlistStockSlab'
import './style.css'

function StockSlabsDisplay({changeSymbl,data}) {
    
    return (
        <div className="StockSlabsDisplay">
            <div>
                {
                    data?
                        data.map((stocksData) => (
                            <StockSlab changeSymbl={changeSymbl} data={stocksData}/>
                        )) : null
                }
            </div>

            <div className="divFill">.</div>
        </div>
    )
}

export default StockSlabsDisplay

