import React,{useState,useEffect,Fragment} from 'react'
import WatchListWindow from '../WatchListWindows'
import Charts from './Charts'
import StockInfo from './StockInfo'
import BuyBox from './BuyBox'
import SellBox from './SellBox';
import {getFunds} from '../../routes/portfolio.routes'
import { getAllWatchList} from '../../routes/watchList.routes'
import {getFundamentals} from '../../routes/yFinance.routes'
import './style.css'
import  Buy from '../Buttons/Buy'
import Sell from '../Buttons/Sell'
import Remove from '../Buttons/Remove'
import Add from '../Buttons/Add'
import {includedSymbol} from '../../utils/includedSymbol';
import {removeSymbl, addSymbl} from '../../routes/watchList.routes';
import MobileSellBox from './MobileSellBox';
import MobileBuyBox from './MobileBuyBox';
import MobileStockInfo from './MobileStockInfo'
import BackDrop from './BackDrop';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
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




function WatchList() {
    
    const [index, setIndex] = useState(0);
    const [watchListData, setWatchListData] = useState(DataArray);
    const [watchListArray, setWatchListArray] = useState(watchListData[0]);
    const [stockInfo, setStockInfo] = useState(null);
    const [included, setIncluded] = useState(true);
    const [buyBoxOpen, setBuyBoxOpen] = useState(false);
    const [sellBoxOpen, setSellBoxOpen] = useState(false);
    const [symbl,setSymbl] = useState("HDFCBANK");
    const [currPrice, setCurrentPrice] = useState(0);
    const [backDropOpen, setBackDrop] = useState(false);
    const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
    const [buybox, setBox] = useState(
            <BuyBox open={buyBoxOpen} closeFun={setBuyBoxOpen} price={currPrice} symbl={symbl} />
        
    )
    useEffect(() => {
        getAllWatchList().then((data) => {
            console.log("yaha bhai yaha ", data);
            if(data !== null)
            setWatchListData(data);
            // setWatchListArray(watchListData)
            // console.log("pehle", data[0][0])
            // setSymbl(data[0][0]);
        })
    },[]);

    useEffect(() => {
        getFundamentals(symbl).then((data) => {
            console.log("mycomputer size :: " , data)
            setStockInfo(data);
        })

        getFunds();
    },[]);

    useEffect(() => {
        if(backDropOpen === false) {
            setBuyBoxOpen(false);
            setSellBoxOpen(false);
            setMobileInfoOpen(false);
            getFunds();
        }
    },[backDropOpen])
    useEffect(() => {

        if(buyBoxOpen === true){
            setSellBoxOpen(false);
            setBackDrop(true);
        } else {
            setBackDrop(false);
        }
        getFunds();
    },[buyBoxOpen]);

    useEffect(() => {
        if(sellBoxOpen === true) {
            setBuyBoxOpen(false);
            setBackDrop(true);
        } else {
            setBackDrop(false);
        }
        getFunds();
    },[sellBoxOpen]);
    useEffect(() => {
        // console.log(symbl)
        getFundamentals(symbl).then((data) => {
            
            setStockInfo(data);
            console.log("included ",includedSymbol(watchListData,symbl));
            setIncluded(includedSymbol(watchListData,symbl));
        })
        // setBackDrop(true);
        setMobileInfoOpen(true);
    },[symbl]);

    useState(() => {
        if(stockInfo)
        setCurrentPrice(stockInfo.lastPrice);
    }, [stockInfo]);
    
    
    useEffect(() => {
        setWatchListArray(watchListData[index]);
        if( watchListData[index].length > 0 && watchListData[index][0] !== "ABC")
            setSymbl(watchListData[index][0]);
        else {
            setSymbl("ABC");
        }
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

    useEffect(()=>{
        console.log("aajka price : ", currPrice);
        
    },[currPrice]);
    console.log("hello 2");
    return (
        <div className="watchList_main">
        <BackDrop open={backDropOpen} closeFunc={setBackDrop} />
            {
                window.innerWidth < 920 ? (
                    <Fragment>
                        <MobileBuyBox open={buyBoxOpen} closeFun={setBuyBoxOpen} />
                        <MobileSellBox  open={sellBoxOpen} closeFun={setSellBoxOpen}/>
                    </Fragment>
                ) : null
            }

            <WatchListWindow 
                data={watchListArray} 
                changeIndex={changeIndex}  
                changeChosenSymbl={changeChosenSymbl} 
                changeChosenSymbl2={changeChosenSymbl2} 
                index={index} 
                refetchWatchList={refetchWatchList}
                buyOpen={setBuyBoxOpen}
                sellOpen={setSellBoxOpen}
            />
            
                    <div className="watchList_selectedStock">
                        
                        <SellBox open={sellBoxOpen} closeFun={setSellBoxOpen} price={currPrice} symbl={symbl}  />
                        <BuyBox open={buyBoxOpen} closeFun={setBuyBoxOpen} price={currPrice} symbl={symbl} />
                        
                        
                        <div className="watchList_chart">
                            <Charts symbl={symbl} />
                        </div>
                        
                        <div className="watchList_stockInfoHead">
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            {symbl}
                            </SlideFade>
                            <SlideFade
                                direction="top"
                                in={true}
                                transition={{ enter: { duration: 1, delay: 0.2 } }}
                            >
                            <div className="watchList_stockInfoHead_button"> 
                                <Buy illustration="Buy" open={setBuyBoxOpen}  />
                                <Sell illustration="Sell" open={setSellBoxOpen} />
                                {
                                    included ?<div ><Remove illustration="Remove" remove={remove}/></div> : <div onClick={add}><Add illustration="Add" add={add}/></div>
                                }
                            </div>
                            </SlideFade>
                        </div>
                        
                        <StockInfo symbl={symbl} data={stockInfo} index={index}/>
                        <div className="watchList_fill">.fegg</div>
                </div>
                
                    
                        {mobileInfoOpen === true ?
                        (
                            <div className="MobileStockInfo_main">
                                <div className="watchList_chart mobile-chart">
                                    <Charts symbl={symbl} />
                                </div>
                                <div className="watchList_stockInfoHead mobile-head">
                                    {symbl}
                                    <div className="watchList_stockInfoHead_button"> 
                                        <Buy illustration="Buy" open={setBuyBoxOpen}  />
                                        <Sell illustration="Sell" open={setSellBoxOpen} />
                                        {
                                            included ?<div ><Remove illustration="Remove" remove={remove}/></div> : <div onClick={add}><Add illustration="Add" add={add}/></div>
                                        }

                                    </div>
                                </div>
                            </div>
                        ) : null}
                    
                
            
            
        </div>
    )
}


export default WatchList




