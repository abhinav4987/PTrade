    import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { CandlestickSeries,BarSeries,LineSeries } from "react-stockcharts/lib/series";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { fitWidth } from "react-stockcharts/lib/helper";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from 'd3-scale';
import { scaleUtc } from 'd3-scale';
import { utcWeek,utcMonth,utcYear,utcDay,utcMinute, utcHour} from "d3-time";
// import { utcDay } from "d3-time";
import MadeData from './Data';


import './style.css'

const candlesAppearance = {
    wickStroke: "#000000",
    fill: function fill(d) {
        return d.close > d.open ? "rgb(255, 0, 0)" : "rgb(0, 197, 0)";
    },
    stroke: "#000000",
    candleStrokeWidth: 1,
    widthRatio: 0.8,
    opacity: 1,
}

const margin = {
    left:50,
    right:50,
    top:10,
    bottom:30
}


function Charts({data, width, type, ratio, time}) {
    
    console.log("HELLO : ",data);
    const [timeUnitCandleStick,  setTimeUnitCandleStick] = useState(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcMinute)} stroke="#f08937" />);
    const [timeUnitBar, setTimeUnitBar] = useState(<BarSeries yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)

    const xAccessor = (d) => {
        return new Date(d.date);
    }

    useEffect(() => {
        
        if(time === "1m") {
            // console.log("here 1");
            setTimeUnitCandleStick(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcMinute)} stroke="#f08937"  />);
        } else if(time === "1hr") {
            // console.log("here 2");
            setTimeUnitCandleStick(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcHour)} stroke="#f08937" />);
        } else if(time === "1d") {
            // console.log("here 3");
            setTimeUnitCandleStick(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcDay)} stroke="#f08937" />);
        } else if (time === "1wk") {
            // console.log("here 4");
            setTimeUnitCandleStick(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcWeek)} stroke="#f08937" />);
        } else if(time === "1mo") {
            // console.log("here 5");
            setTimeUnitCandleStick(<LineSeries yAccessor={d => d.close} width={timeIntervalBarWidth(utcMonth)} stroke="#f08937" />);
        }
    },[time]);

    const height = 300;
    var gridHeight = height - margin.top - margin.bottom;
    var gridWidth = width - margin.left - margin.right;

    var showGrid = true;
    var xGrid = showGrid ? { 
        innerTickSize: -1 * gridHeight,
        tickStrokeDasharray: 'DashDot',
        tickStrokeOpacity: 0.2,
        tickStrokeWidth: 0.7
    } : {};

    var yGrid = showGrid ? { 
        innerTickSize: -1 * gridWidth,
        tickStrokeDasharray: 'DashDot',
        tickStrokeOpacity: 0.2,
        tickStrokeWidth: 0.7
    } : {};
    const xEvents = [new Date(data[0].date), new Date(data[data.length -1].date)];
    return (
        <div className="Charts">
        <SlideFade
            direction="top"
            in={true}
            transition={{ enter: { duration: 1, delay: 0.2 } }}
        >
            <ChartCanvas 
                height={300}
                ratio={ratio}
                width={width}
                margin={margin}
                data={data}
                type={type}
                xAccessor={xAccessor}
                xScale = {scaleTime()}
                xExtents={xEvents}

                mouseMoveEvent={true}
                panEvent={true}
                zoomEvent={true}
                // clamp={true}
            >
                
                <Chart
                    id={1}
                    yExtents={(d) => [d.high, d.low]}
                >
                    <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                    <XAxis axisAt="top" orient="top" ticks={0} stroke="#111"/>
                    <YAxis axisAt="left" orient="left" ticks={5} className="chartY-axis" fontSize="14" stroke="#111"/> 
                    <YAxis axisAt="right" orient="right" ticks={0}  stroke="#111"/>
                    <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")}/>
                    <MouseCoordinateY at="left" orient="left" displayFormat={format(".4s")}/>
                    
					<ZoomButtons
						onReset={false}
                        fill="#111"
                        fillOpacity="1"
                        textFill="#ffff"
                        zoomMultiplier="3"
					/>
                    {timeUnitCandleStick}
                    <CrossHairCursor />             
                </Chart>
            
            </ChartCanvas>
            </SlideFade>
        </div>
    )
}



Charts.prototype = {
    data: PropTypes.array,
    width: PropTypes.number,
    ratio: PropTypes.number,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};



Charts.defaultProps = {
    type: "svg",
};

Charts = fitWidth(Charts)

export default Charts;
