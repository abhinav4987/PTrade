import React,{useState, useEffect} from 'react'
import { getHistory } from '../../../routes/yFinance.routes';
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import './style.css';
import Charts from './Charts'
import MadeData from './Data';


const intervals =  {
    "1d" : {id :"1",value :"1m"},
    "1mo": {id :"2",value :"1h"},
    "6mo" : {id :"3",value :"1d"},
    "1y" : {id :"4",value :"1wk"},
    "5y" : {id :"5",value :"1wk"},
    "10y" : {id :"6",value :"1wk"}
}


function Chart({symbl}) {
    console.log("hello");
    
    const [newData,setNewData] = useState([]);
    const [chartData, setChartData] = useState(MadeData);
    // const [symbl, setSymbl] = useState(SYMBL);
    const [period, setPeriod] = useState("1d");
    const [interval, setInterval] = useState(intervals["1d"]);
    const [chartsToDisplay, setChartsToDisplay] = useState(null);
    useEffect(() => {
        // setChartData(MadeData);
        console.log("hello people");
        getHistory({
            symbl: symbl,
            interval : interval.value,
            period : period,
        }).then((nextData) => {
            if(nextData !== null && typeof(nextData) !== "undefined") {
                setNewData(nextData);
                // console.log("new data");
            } else {
                setNewData(MadeData);
                setChartData(MadeData)
                // console.log("old data");
            }
        }).catch((error)=>{
            console.log(error);
        });
    },[symbl]);

    
    useEffect(() => {
        setInterval(intervals[period]);
    },[period]);
    
    useEffect(() => {
        fetchChart();        
    },[interval]);

    const fetchChart = () => {
        console.log("requesting...");
        setChartData(MadeData);
        console.log(interval, " ", period);
        getHistory({
            symbl: "HDFCBANK",
            interval : interval.value,
            period : period,
        }).then((nextData) => {
            console.log("new request : ", nextData);
            if(nextData !== null && typeof(nextData) !== "undefined") {
                
                // console.log("yaha", nextData);
                setNewData(nextData);
                // console.log("new data");
            } else {

                setNewData(MadeData);
                // setChartData(MadeData)
                console.log("old data");
            }
            // console.log(nextData);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(() => {
        if( Object.keys(newData).length !== 0) {
            console.log(newData);
            
            if(newData.hasOwnProperty("chartData")){
                if(newData.chartData.length > 2)
                setChartData(newData.chartData);
                else 
                setChartData(MadeData);
            }
            console.log(newData);
            if(typeof(newData) === 'undefined')
            setChartData(MadeData);
            // setXEvents([
            //     new Date(newData.chartData[0].date),
            //     new Date(newData.chartData[newData.chartData.length -1].date)
            // ])
        }
        console.log(newData); 
        
    },[newData]);

    useEffect(() => {
        console.log("watchList : ", chartData);
        setChartsToDisplay(<Charts data={chartData} time={interval.value}/>);
    },[chartData]);
    
    const changePeriod = (e) => {
        // setPeriod(value);
        console.log(e.target);
    }

    return (
        <div className="Charts_watchlist">
            {chartsToDisplay === null ? <Charts data={chartData} time={interval.value}/> : chartsToDisplay}
            <div className="SelectTime">
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("1d")}>1D</button>
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("1mo")}>1MO</button>
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("6mo")}>6MO</button>
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("1y")}>1YR</button>
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("5y")}>5YR</button>
                </SlideFade>
                <SlideFade
                    direction="top"
                    in={true}
                    transition={{ enter: { duration: 1, delay: 0.2 } }}
                >
                <button className="selectTime-button" type="button" onClick={() => setPeriod("10y")}>10YR</button>
                </SlideFade>
            </div>
        </div>
    )
}

export default Chart
    