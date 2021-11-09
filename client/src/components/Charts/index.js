import React,{useState, useEffect} from 'react'
import './style.css'
import { getData } from './../../utils/getData';
import { TypeChooser } from "react-stockcharts/lib/helper";
import Charts from './Chart/Charts'
import MAChart from './Chart/MAChart'
import Bollinger from './Chart/Bollinger'
import MadeData from './Data';
import MACD from './Chart/MACD'
import RSI from './Chart/RSI';
import ElderRay from './Chart/ElderRay'
import { scaleTime } from 'd3-scale';
import { getTopGainer, getTopLooser } from '../../routes/nseTools.route';
import SidePannel from './SidePannel/index';
import { getHistory } from '../../routes/yFinance.routes';
import ControlPanel from './ControlPanel';
function Chart() {

    const [chartsToDisplay,setChartsToDisplay] = useState([]);
    const [xEvents, setXEvents] = useState([new Date(2020, 0, 30), new Date(2020,1,16)])
    const [chartData, setChartData] = useState(MadeData);
    const [chartXScale, setXScale] = useState(scaleTime);
    const [newData,setNewData] = useState([]);
    const [interval, setInterval] = useState("1m");
    const [period, setPeriod] = useState("1d");
    const [symbl, setSymbl] = useState("HDFCBANK")
    const [indicator, setIndicator] = useState(null);
    const [chart, setChart] = useState(<Charts chartData={chartData} time={interval} />);
    const showToken = (symbol) => {
        setSymbl(symbol);
    }
    const intervalChange =  (value) => {
        console.log("intervalValue : ",interval);
        setInterval(value);
    }

    const periodChange = (value) => {
        console.log("periodlValue : ",period);
        setPeriod(value);
    }
    const indicatorChange = (value) => {
        // console.log("periodlValue : ",period);
        console.log(value);
        setIndicator(value);
    }

    useEffect(() => {
        setChartData(MadeData);
        // console.log(JSON.stringify(symbl));
        getHistory({
            symbl: symbl,
            interval : interval,
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
    },[]);
    useEffect(() => {
        if(indicator === "None") {
            setChart(<Charts chartData={chartData} time={interval} />)
        } else if(indicator === "Moving Average") {
            setChart(<MAChart chartData={chartData} time={interval}/>)
        } else if(indicator === "Bollinger Band") {
            setChart(<Bollinger chartData={chartData} time={interval}/>)
        } else if(indicator === "MACD") {
            setChart(<MACD chartData={chartData} time={interval}/>)
        } else if(indicator === "RSI") {
            console.log(indicator);
            setChart(<RSI chartData={chartData} time={interval}/>)
        } else if(indicator === "ElderRay") {
            console.log(indicator);
            setChart(<ElderRay chartData={chartData} time={interval}/>)
        }
    },[indicator]);

    useEffect(() => {

        console.log("requesting...");
        setChartData(MadeData);
        console.log(symbl);
        getHistory({
            symbl: symbl,
            interval : interval,
            period : period,
        }).then((nextData) => {
            if(nextData !== null && typeof(nextData) !== "undefined") {
                
                console.log("yaha", nextData);
                setNewData(nextData);
                console.log("new data");
            } else {

                setNewData(MadeData);
                // setChartData(MadeData)
                console.log("old data");
            }
            console.log(nextData);
        }).catch((error)=>{
            console.log(error);
        });
    },[interval, period,symbl]);


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
        console.log(chartData);
        if(indicator === "None") {
            setChart(<Charts chartData={chartData} time={interval} />)
        } else if(indicator === "Moving Average") {
            setChart(<MAChart chartData={chartData} time={interval}/>)
        } else if(indicator === "Bollinger Band") {
            setChart(<Bollinger chartData={chartData} time={interval}/>)
        } else if(indicator === "MACD") {
            setChart(<MACD chartData={chartData} time={interval}/>)
        } else if(indicator === "RSI") {
            setChart(<RSI chartData={chartData} time={interval}/>)
        } else if(indicator === "ElderRay") {
            console.log(indicator);
            setChart(<ElderRay chartData={chartData} time={interval}/>)
        }
    },[chartData, xEvents]);

    return (
        <div className="Charts_main">
            
        
            <div>
                {chart}
            </div>
            
            <div>
                <ControlPanel symbl={symbl} intervalChange={intervalChange} periodChange={periodChange} indicatorChange={indicatorChange}/>
            </div>

            
            <SidePannel  showToken={setSymbl}/>

        </div>
    )
}

export default Chart
    