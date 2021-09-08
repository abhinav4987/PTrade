import React, {useState, useEffect} from 'react';
// import Select from "react-dropdown-select";
import Select from 'react-select'
import './style.css';

const intervalOptions = [
    {label : "1m",value : "1m"},
    {label : "1h",value : "1h"},
    {label : "1d",value : "1d"},
    {label : "1wk",value : "1wk"},
    {label: "1mo",value : "1mo"},
]

const periodOptions = [
    {label: "1d",value : "1d"},
    {label : "1mo",value : "1mo"},
    {label : "6mo",value : "6mo"},
    {label : "1y",value : "1y"},
    {label : "5y",value : "5y"},
    {label : "10y",value : "10y"},
]

const indicatorOptions = [
    {label: "None", value:"None"},
    {label: "Moving Average", value: "Moving Average"},
    {label: "Bollinger Band", value: "Bollinger Band"},
    {label: "MACD", value: "MACD"},
    {label: "RSI", value: "RSI"},
    {label: "ElderRay", value: "ElderRay"},
]

function ControlPanel({symbl,intervalChange,periodChange,indicatorChange}) {
    
    const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
    const [selectedInterval,setSelectedInterval] = useState(intervalOptions[0]);
    const [selectedIndicator, setSelectedIndicator] = useState(indicatorOptions[0]);
    useEffect(() => {
        console.log(selectedInterval);
        intervalChange(selectedInterval.value);
    },[selectedInterval])

    useEffect(() => {
        console.log(selectedPeriod);
        periodChange(selectedPeriod.value);
    },[selectedPeriod])

    useEffect(() => {
        console.log(selectedIndicator);
        indicatorChange(selectedIndicator.value);
    },[selectedIndicator])

    
    const onPeriodChange = (value) => {
        console.log(value);
    };
    return (
        <div className="controlPanel">
            <div className="controlPanel_period controlPanel_Segment">
            <span className="controlPanel_symbl">{symbl}</span>
            <span className="selectHead">Period </span>
            <Select
                className="control_Select"
                defaultValue={periodOptions[0]}
                options={periodOptions}
                onChange={setSelectedPeriod}
            />
            </div>
            <div className="controlPanel_interval controlPanel_Segment">
            <span className="selectHead">Interval </span>
            <Select
                className="control_Select"
                onChange={setSelectedInterval}
                defaultValue={intervalOptions[0]}
                name="color"
                options={intervalOptions}
            />
            </div>

            <div className="controlPanel_interval controlPanel_Segment">
            <span className="selectHead">Indicator </span>
            <Select
                className="control_Select2"
                onChange={setSelectedIndicator}
                defaultValue={indicatorOptions[0]}
                name="color"
                options={indicatorOptions}
            />
            </div>
            <div className="controlPanel_period controlPanel_Segment">
            
            </div>
        </div>
    )
}

export default ControlPanel

