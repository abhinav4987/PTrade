import React,{useState, useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getTopGainer, getTopLooser } from '../../../routes/nseTools.route';
import {StockSymbolData} from '../symbl';
import GainerLooser from '../GainerLooserSlab';
import './style.css'

const TopGainerData = [1,1,1,1,1,1];
const TopLooserData = [2,2,2,2,2,2];




function SidePannel({showToken}) {
    
    console.log(StockSymbolData);
    const [newGainerData, setNewGain] = useState([]);    
    const [newLooserData, setNewLoss] = useState([]);
    const [symbol, setSymbl] = useState("HDFCBANK");
    useEffect(() => {
        getTopGainer().then((data) => setNewGain(data));
        getTopLooser().then((data)=> setNewLoss(data));    
    },[]);

    const getToken = (token) => {
        setSymbl(token);
    }

    useEffect(() => {
        if(symbol !== "") {
            showToken(symbol);
        }
    },[symbol]);
   
    const topgainerSlabs = newGainerData.length === 0 ? TopGainerData.map((data) => {
        return <GainerLooser /> }) : newGainerData.map((data) => {
        return <GainerLooser getToken={getToken} symbl={data.symbol} price={data.highPrice} /> 
    });
    const topLooserSlabs = newLooserData.length === 0 ? TopLooserData.map((data) => {
        return <GainerLooser />     }) : newLooserData.map((data) => {
        return <GainerLooser  getToken={getToken} symbl={data.symbol} price={data.highPrice} /> 
    });

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnSelect = (item) => {
        showToken(item.SYMBL);
    }


    return (
        <div className="charts_sidePannel">
            
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
                    height: "44px",
                    iconColor: "white",
                    lineColor: "rgb(232, 234, 237)"
                }}
                resultStringKeyName="SYMBL"
                maxResults={10}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                // onSearch={}
                // onHover={}
                // onSelect={}
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
                    <span className="panel_colHead">TOP LOOSER</span>
                    <div className="slabList">
                        {topLooserSlabs}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SidePannel;


