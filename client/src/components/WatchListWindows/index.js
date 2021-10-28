import React, {useState, useEffect} from 'react'
import BottomSelect from './BottomSelect';
import SearchWindow from './SearchWindow/index';
import StockSlabsDisplay from './StockSlabsDisplay/index';
import './style.css'







function WatchListWindows({changeIndex,
    changeChosenSymbl,
    changeChosenSymbl2,
    data,
    index,
    refetchWatchList,
    buyOpen,
    sellOpen}) {
    
    console.log("display data " , data);
    const [watchListIndex, setWatchListIndex] = useState(0);
    
    // const [watchListData, setWatchlistData] = useState(
    //     data
    // );

    // useEffect(() => {
    //     console.log(watchListData);
    // },[watchListData])

    

    const changeSymbl = (value) => {
        console.log("changing symbl");
        changeChosenSymbl2(value)
    };

    return (
        <div className="WatchListWindow">
            <SearchWindow changeSymbl={changeChosenSymbl} />
            <StockSlabsDisplay 
                changeSymbl={changeSymbl} 
                data={data} 
                index={index} 
                refetchWatchList={refetchWatchList} 
                buyOpen={buyOpen} 
                sellOpen={sellOpen}
                />
            <BottomSelect  changeIndex={changeIndex}/>
        </div>
    )
}

export default WatchListWindows
