import React,{useState, useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getTopGainer, getTopLooser } from '../../../routes/nseTools.route';
import {getFundamentals} from '../../../routes/yFinance.routes';
import {StockSymbolData} from '../symbl';
import GainerLooser from '../GainerLooserSlab';
import RangeDisplay from './RangeDisplay';
import './style.css'

const TopGainerData = [1,1,1,1,1,1];
const TopLooserData = [2,2,2,2,2,2];




function SidePannel({showToken}) {
    
    console.log(StockSymbolData);
    const [newGainerData, setNewGain] = useState([]);    
    const [newLooserData, setNewLoss] = useState([]);
    const [symbol, setSymbl] = useState("HDFCBANK");
    const [low52, setLow52] = useState(0);
    const [high52, sethigh52] = useState(0);
    const [low, setLow] = useState(1000);
    const [high, setHigh] = useState(1000);
    const [current, setCurrent] = useState(400)
    const [volume, setVolume] = useState(10000);
    const [previousClose, setPreviousClose] = useState(10000);
    const [open, setOpen] = useState();
    const [faceValue, setFaceValue] = useState(100);
    const [VaR, setVar] = useState(10);

    // const handleOnSelect = (item) => {
    //     setSymbl(item)
    // }

    useEffect(() => {
        getTopGainer().then((data) => setNewGain(data));
        getTopLooser().then((data)=> setNewLoss(data));  
          
    },[]);
    useEffect(() => {
        getFundamentals(symbol).then((data) => {
            console.log(data);
            setLow52(parseFloat(data.low52.replace(",","")))
            sethigh52(parseFloat(data.high52.replace(",","")));
            setLow(parseFloat(data.dayLow.replace(",","")));
            setHigh(parseFloat(data.dayHigh.replace(",","")));
            setCurrent(parseFloat(data.lastPrice.replace(",","")));
            setVolume(data.totalTradedVolume);
            setOpen(data.open);
            setPreviousClose(data.previousClose);
            setFaceValue(data.faceValue);
            setVar(data.securityVar);
        })
    },[symbol]);
    const getToken = (token) => {
        setSymbl(token);
    }

    useEffect(() => {
        if(symbol !== "") {
            showToken(symbol);
        }
    },[symbol]);
   
    const topgainerSlabs = newGainerData.length === 0 ? TopGainerData.slice(0,5).map((data) => {
        return <GainerLooser /> }) : newGainerData.slice(0,5).map((data) => {
        return <GainerLooser getToken={getToken} symbl={data.symbol} price={data.highPrice} /> 
    });
    const topLooserSlabs = newLooserData.length === 0 ? TopLooserData.slice(0,5).map((data) => {
        return <GainerLooser />     }) : newLooserData.slice(0,5).map((data) => {
        return <GainerLooser  getToken={getToken} symbl={data.symbol} price={data.highPrice} /> 
    });

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
    }

    const handleOnSelect = (item) => {
        console.log(item);
        setSymbl(item.SYMBL);
    }


    return (
        <div className="charts_sidePannel">
            
            <div className="selected_stock_info">
                <span>{symbol}</span>
                <div className="stock_statistics">
                    <div className="stockdetail_slab">
                        <span>Volume</span>
                        <span>{volume}</span>
                    </div>
                    <div className="stockdetail_slab">
                        <span>Open price</span>
                        <span>{open}</span>
                    </div>
                    <div className="stockdetail_slab">
                        <span>Previous Close</span>
                        <span>{previousClose}</span>
                    </div>
                    <div className="stockdetail_slab">
                        <span>Face Value</span>
                        <span>{faceValue}</span>
                    </div>
                    <div className="stockdetail_slab">
                        <span>VaR</span>
                        <span>{VaR}</span>
                    </div>
                    <div className="stockdetail_slab range_detail">
                        <span>IntrDay L/H</span>
                        <RangeDisplay low={low} high={high} current={current} />
                    </div>
                    <div className="stockdetail_slab range_detail">
                        <span>52 Week L/H</span>
                        <RangeDisplay low={low52} high={high52} current={current}/>
                    </div>
                </div>
            </div>


            <div className="sidepanel_genral_data">
                <div className="sidePannel_searchBox">
                
                <ReactSearchAutocomplete
                    items={StockSymbolData}
                    fuseOptions={{
                        keys: ["SYMBL","CMPNY"]
                    }}
                    styling={{
                        flexGrow: 1,
                        borderRadius: "4px",
                        color: "black",
                        width: "350px",
                        height: "44px",
                        iconColor: "white",
                        lineColor: "rgb(232, 234, 237)"
                    }}
                    resultStringKeyName="SYMBL"
                    placeholder="Search stocks..."
                    maxResults={10}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    // onSearch={}
                    // onHover={}
                    // onSelect={(item)=>setSymbl(item)}
                    // onFocus={}
                    // autoFocus={}
                    // formatResult={}
                />
                </div>

                <div className="sidePanel_gainerLooser">
                    <div className="sidePannel_topGainer">
                        <span className="panel_colHead">TOP GAINER</span>
                        <div className="slabList">
                            {topgainerSlabs}
                        </div>
                    </div>
                    <div className="sidePannel_topLooser">
                        <span className="panel_colHead">TOP LOSER</span>
                        <div className="slabList">
                            {topLooserSlabs}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SidePannel;


// adhocMargin: "-"
// ​
// applicableMargin: "14.18"
// ​
// averagePrice: "1,687.50"
// ​
// basePrice: "1,703.90"
// ​
// bcEndDate: "-"
// ​
// bcStartDate: "-"
// ​
// buyPrice1: "1,667.75"
// ​
// buyPrice2: "-"
// ​
// buyPrice3: "-"
// ​
// buyPrice4: "-"
// ​
// buyPrice5: "-"
// ​
// buyQuantity1: "56,960"
// ​
// buyQuantity2: "-"
// ​
// buyQuantity3: "-"
// ​
// buyQuantity4: "-"
// ​
// buyQuantity5: "-"
// ​
// change: "-32.90"
// ​
// closePrice: "1,667.75"
// ​
// cm_adj_high_dt: "20-OCT-21"
// ​
// cm_adj_low_dt: "02-NOV-20"
// ​
// cm_ffm: "6,18,286.03"
// ​
// companyName: "Infosys Limited"
// ​
// css_status_desc: "Listed"
// ​
// dayHigh: "1,712.60"
// ​
// dayLow: "1,661.05"
// ​
// deliveryQuantity: "32,01,958"
// ​
// deliveryToTradedQuantity: "54.50"
// ​
// exDate: "26-OCT-21"
// ​
// extremeLossMargin: "3.50"
// ​
// faceValue: "5.00"
// ​
// high52: "1,848.00"
// ​
// indexVar: "-"
// ​
// isExDateFlag: false
// ​
// isinCode: "INE009A01021"
// ​
// lastPrice: "1,671.00"
// ​
// low52: "1,051.10"
// ​
// marketType: "N"
// ​
// ndEndDate: "-"
// ​
// ndStartDate: "-"
// ​
// open: "1,699.00"
// ​
// pChange: "-1.93"
// ​
// previousClose: "1,703.90"
// ​
// priceBand: "No Band"
// ​
// pricebandlower: "1,533.55"
// ​
// pricebandupper: "1,874.25"
// ​
// purpose: "INTERIM DIVIDEND - RS 15 PER SH"
// ​
// quantityTraded: "58,75,091"
// ​
// recordDate: "27-OCT-21"
// ​
// secDate: "29-Oct-2021 00:00:00"
// ​
// securityVar: "10.68"
// ​
// sellPrice1: "-"
// ​
// sellPrice2: "-"
// ​
// sellPrice3: "-"
// ​
// sellPrice4: "-"
// ​
// sellPrice5: "-"
// ​
// sellQuantity1: "-"
// ​
// sellQuantity2: "-"
// ​
// sellQuantity3: "-"
// ​
// sellQuantity4: "-"
// ​
// sellQuantity5: "-"
// ​
// series: "EQ"
// ​
// surv_indicator: "-"
// ​
// symbol: "INFY"
// ​
// totalBuyQuantity: "56,960"
// ​
// totalSellQuantity: "-"
// ​
// totalTradedValue: "99,142.16"
// ​
// totalTradedVolume: "58,75,091"