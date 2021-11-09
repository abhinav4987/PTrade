import React, {useState, useEffect} from 'react'
import PortfolioStocksWindows from '../PortfolioStocksWindows'
import PortfolioDetailWindow from './../PortfolioDetailWindow/index';
import MobilePortfolio from '../MobilePortfolio'
import BuyBox from '../Watchlist/BuyBox';
import SellBox from '../Watchlist/SellBox';
import {getAllStocks} from '../../routes/portfolioStocks.routes';
import {getFunds} from '../../routes/portfolio.routes'
import {getFundamentals} from '../../routes/yFinance.routes';
import {updatePortfolio} from '../../routes/portfolio.routes'
import BackDrop from './BackDrop';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css';




const ownedStockOG = [

]



function Portfolio() {
    
    const [StockIndex, setStockIndex] = useState(0);
    const [ownedStocks, setOwnedStocks] = useState(ownedStockOG);
    const [currentPrices, setCurrentPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdated] = useState(false);
    const [symbl, setSymbl] = useState("ABC");
    const [symblCurrPrice, setSymblCurrPrice] = useState(0);
    const [buyBoxOpen, setBuyBoxOpen] = useState(false);
    const [sellBoxOpen, setSellBoxOpen] = useState(false);
    const [backDropOpen, setBackDrop] = useState(false);
    // const [funds, setFunds] = useState(localStorage.getItem("funds"));
    const changeIndex = (index) => {
        setStockIndex(index);
    }



    useEffect(() => {
        getAllStocks().then((data) => {
            console.log("owned Stocks", data);
            setOwnedStocks(data.result);
        }).catch((error) => {
            setOwnedStocks(ownedStockOG);
        });
    },[])

    useEffect(() => {
        updatePortfolio().then((data) => {
            if(data) {
                setUpdated(true);
            }
        })
    },[]);

    useEffect(() => {
        getFunds();
    },[update]);

    useEffect(() => {
        console.log("humare stocks : ",ownedStocks)
        
        if(ownedStocks.length > 0 &&  ownedStocks[0].symbol !== "FAKE") {
            setSymbl(ownedStocks[0].symbl);
            let priceList = [];
            for(let i = 0;i < ownedStocks.length ;i++) {
                
                getFundamentals(ownedStocks[0].symbl).then((data) => {
                    priceList.push(data);
                    let dummy = currentPrices;
                    dummy.push(data)
                    console.log("dummy : ", data);
                    setCurrentPrices(dummy);

                });
            }
            
        }
    },[ownedStocks]);

    
    useEffect(() => {

        if(buyBoxOpen === true){
            setSellBoxOpen(false);
            setBackDrop(true);
        } else {
            setBackDrop(false);
            getAllStocks().then((data) => {
                console.log("owned Stocks", data);
                setOwnedStocks(data.result);
            }).catch((error) => {
                setOwnedStocks(ownedStockOG);
            });
        }
        getFunds();
    },[buyBoxOpen]);

    useEffect(() => {
        if(sellBoxOpen === true) {
            setBuyBoxOpen(false);
            setBackDrop(true);
        } else {
            setBackDrop(false);
            getAllStocks().then((data) => {
                console.log("owned Stocks", data);
                setOwnedStocks(data.result);
            }).catch((error) => {
                setOwnedStocks(ownedStockOG);
            });
        }
        getFunds();
    },[sellBoxOpen]);

    useEffect(() => {
        console.log("currentPrices : ", currentPrices);
    },[currentPrices]);

    return (
        <>  
            
        <div className="portfolio_main">
        <BackDrop open={backDropOpen} closeFunc={setBackDrop} />
            <div className="desktop-portfolio">
                
                <PortfolioStocksWindows data={ownedStocks} changeSymbl={setSymbl} setCurrPrice={setSymblCurrPrice} buyOpen={setBuyBoxOpen} sellOpen={setSellBoxOpen}/>
                <div className="selected_portfolio">
                    <SellBox open={sellBoxOpen} closeFun={setSellBoxOpen} price={symblCurrPrice} symbl={symbl}  />
                    <BuyBox open={buyBoxOpen} closeFun={setBuyBoxOpen} price={symblCurrPrice} symbl={symbl} />
                    <PortfolioDetailWindow data={ownedStocks} symbl={symbl} />
                </div>
            </div>
            <div className="mobile-portfolio">
                <MobilePortfolio /> 
            </div>
        </div>
        </>
    )
}

export default Portfolio



