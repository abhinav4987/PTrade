import React,{useState,useEffect} from 'react'
import WatchListWindow from '../WatchListWindows'
import Charts from './Charts'
import StockInfo from './StockInfo'
import { getAllWatchList} from '../../routes/watchList.routes'
import {getFundamentals} from '../../routes/yFinance.routes'
import './style.css'

let DataArray = [
    [
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
    ],

    [
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
    ],

    [
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
    ],

    [
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
        
            'ABC',
            
        ,
    ],
    [
        
            'ABC',
            
        ,
        
    ]

    
];

// RELIANCE ICICIBANK

function WatchList() {
    
    const [index, setIndex] = useState(0);
    const [watchListData, setWatchListData] = useState(DataArray);
    const [watchListArray, setWatchListArray] = useState(watchListData[0]);
    const [stockInfo, setStockInfo] = useState(null);
    const [symbl,setSymbl] = useState("HDFCBANK");
    useEffect(() => {
        getAllWatchList().then((data) => {
            console.log("yaha bhai yaha ", data);
            setWatchListData(data);
            // setWatchListArray(watchListData)
            // console.log("pehle", data[0][0])
            // setSymbl(data[0][0]);
        })
    },[]);

    useEffect(() => {
        getFundamentals(symbl).then((data) => {
            
            setStockInfo(data);
        })
    },[]);

    useEffect(() => {
        // console.log(symbl)
        getFundamentals(symbl).then((data) => {
            
            setStockInfo(data);
        })
    },[symbl]);
    
    useEffect(() => {
        setWatchListArray(watchListData[index]);
    },[index,watchListData]);

    const changeIndex = (value) => {
        setIndex(value);
    };
    const changeChosenSymbl = (value) => {
        setSymbl(value);
    };
    console.log("hello 2");
    return (
        <div className="watchList_main">
            <WatchListWindow data={watchListArray} changeIndex={changeIndex}  changeChosenSymbl={changeChosenSymbl}/>
            <div className="watchList_selectedStock">
                <div className="watchList_chart">
                    <Charts symbl={symbl} />
                </div>
                <div className="watchList_stockInfoHead">
                    {symbl}
                    <div></div>
                </div>
                <StockInfo symbl={symbl} data={stockInfo}/>
                <div className="watchList_fill">.fegg</div>
            </div>
        </div>
    )
}


export default WatchList
