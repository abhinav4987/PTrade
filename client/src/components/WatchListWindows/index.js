import React, {useState, useEffect} from 'react'
import BottomSelect from './BottomSelect';
import SearchWindow from './SearchWindow/index';
import StockSlabsDisplay from './StockSlabsDisplay/index';
import './style.css'





function WatchListWindows({changeIndex,changeChosenSymbl, data}) {
    
    console.log("display data " , data);
    const [watchListIndex, setWatchListIndex] = useState(0);
    
    // const [watchListData, setWatchlistData] = useState(
    //     data
    // );

    // useEffect(() => {
    //     console.log(watchListData);
    // },[watchListData])

    

    const changeSymbl = (value) => {
        // changeChosenSymbl(value)
    };
    return (
        <div className="WatchListWindow">
            <SearchWindow changeSymbl={changeChosenSymbl} />
            <StockSlabsDisplay changeSymbl={changeChosenSymbl} data={data} />
            <BottomSelect  changeIndex={changeIndex}/>
        </div>
    )
}

export default WatchListWindows
