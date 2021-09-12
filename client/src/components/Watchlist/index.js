import React,{useState,useEffect} from 'react'
import WatchListWindow from '../WatchListWindows'
import Charts from './Charts'
import StockInfo from './StockInfo'
import { getAllWatchList} from '../../routes/watchList.routes'
import {getFundamentals} from '../../routes/yFinance.routes'
import './style.css'
import  Buy from '../Buttons/Buy'
import Sell from '../Buttons/Sell'
import Remove from '../Buttons/Remove'
import Add from '../Buttons/Add'
import {includedSymbol} from '../../utils/includedSymbol';
import {removeSymbl, addSymbl} from '../../routes/watchList.routes'
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
    const [included, setIncluded] = useState(true);
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
            console.log("included ",includedSymbol(watchListData,symbl));
            setIncluded(includedSymbol(watchListData,symbl));
        })
    },[symbl]);
    
    useEffect(() => {
        setWatchListArray(watchListData[index]);
    },[index,watchListData]);

    const changeIndex = (value) => {
        setIndex(value);
    };
    const changeChosenSymbl = (value) => {
        console.log("changed", value);
        setSymbl(value.SYMBL);
    };
    const changeChosenSymbl2 = (value) => {
        console.log("changed", value);
        setSymbl(value);
    };
    const refetchWatchList = () => {
        getAllWatchList().then((data) => {
            console.log("yaha bhai yaha ", data);
            setWatchListData(data);
        })
    };

    const remove = () => {
        removeSymbl(symbl,index);
        refetchWatchList();
    }

    const add = () => {
        addSymbl(symbl,index);
        refetchWatchList();
    }
    console.log("hello 2");
    return (
        <div className="watchList_main">
            <WatchListWindow data={watchListArray} changeIndex={changeIndex}  changeChosenSymbl={changeChosenSymbl} changeChosenSymbl2={changeChosenSymbl2} index={index} refetchWatchList={refetchWatchList}/>
            <div className="watchList_selectedStock">
                <div className="watchList_chart">
                    <Charts symbl={symbl} />
                </div>
                <div className="watchList_stockInfoHead">
                    {symbl}
                    <div className="watchList_stockInfoHead_button"> 
                        <Buy illustration="Buy" />
                        <Sell illustration="Sell" />
                        {
                            included ?<div ><Remove illustration="Remove" remove={remove}/></div> : <div onClick={add}><Add illustration="Add" add={add}/></div>
                        }

                    </div>
                </div>
                <StockInfo symbl={symbl} data={stockInfo} index={index}/>
                <div className="watchList_fill">.fegg</div>
            </div>
        </div>
    )
}


export default WatchList
