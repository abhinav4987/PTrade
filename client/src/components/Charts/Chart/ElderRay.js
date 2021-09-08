import React,{useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ema, wma, sma, tma, bollingerBand } from "react-stockcharts/lib/indicator";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { CandlestickSeries ,BarSeries ,ElderRaySeries ,LineSeries } from "react-stockcharts/lib/series";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { fitWidth } from "react-stockcharts/lib/helper";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
    CurrentCoordinate
} from "react-stockcharts/lib/coordinates";
import {
	OHLCTooltip,
    SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import {financeDiscontinuousScale} from "react-stockcharts/lib/scale";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime,scaleUtc } from 'd3-scale';
import { utcWeek,utcMonth,utcYear,utcDay,utcMinute, utcHour} from "d3-time";
import {utcSecond,utcMillisecond} from 'd3-time'
import MadeData from '../Data';
import { change, elderRay } from "react-stockcharts/lib/indicator";
import BottomSelect from '../../WatchListWindows/BottomSelect/index';
import '../style.css'
import { getHistory } from '../../../routes/yFinance.routes';






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


function ElderRay({chartData, width, type, ratio, time}) {

    console.log(chartData);

    const [timeUnitCandleStick,  setTimeUnitCandleStick] = useState(<CandlestickSeries width={timeIntervalBarWidth(utcMinute)}  {...candlesAppearance}/>);
    const [timeUnitBar, setTimeUnitBar] = useState(<BarSeries yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
    useEffect(() => {
        console.log(time);
        if(time === "1m") {
            console.log("here 1");
            setTimeUnitCandleStick(<CandlestickSeries width={timeIntervalBarWidth(utcMinute)}  {...candlesAppearance}/>);
            setTimeUnitBar(<BarSeries width={timeIntervalBarWidth(utcMinute)} yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
        } else if(time === "1h") {
            console.log("here 2");
            setTimeUnitCandleStick(<CandlestickSeries width={timeIntervalBarWidth(utcHour)}  {...candlesAppearance}/>);
            setTimeUnitBar(<BarSeries width={timeIntervalBarWidth(utcHour)} yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
        } else if(time === "1d") {
            console.log("here 3");
            setTimeUnitCandleStick(<CandlestickSeries width={timeIntervalBarWidth(utcDay)}  {...candlesAppearance}/>);
            setTimeUnitBar(<BarSeries width={timeIntervalBarWidth(utcDay)} yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
        } else if (time === "1wk") {
            console.log("here 4");
            setTimeUnitCandleStick(<CandlestickSeries width={timeIntervalBarWidth(utcWeek)}  {...candlesAppearance}/>);
            setTimeUnitBar(<BarSeries width={timeIntervalBarWidth(utcWeek)} yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
        } else if(time === "1mo") {
            console.log("here 5");
            setTimeUnitCandleStick(<CandlestickSeries width={timeIntervalBarWidth(utcMonth)}  {...candlesAppearance}/>);
            setTimeUnitBar(<BarSeries width={timeIntervalBarWidth(utcMonth)} yAccessor={d => d.volume}  fill={(d) => d.close > d.open ? "#6BA583" : "red"} />)
        }
    },[time]);

    const height = 400;
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
    
    // const [chartXScale, setXScale] = useState(scaleTime);

    const xAccessor = (d) => {
        return new Date(d.date);
    }
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => {
        return new Date(d.date);
    });
    const elder = elderRay();
    const changeCalculator = change();
    const calculatedData = elder(chartData);
    const {
        data,
        xScale,
        // xAccessor,
        displayXAccessor
    } = xScaleProvider(typeof(chartData) === "undefined" ? MadeData : calculatedData);
    const xEvents = [new Date(data[0].date), new Date(data[data.length -1].date)];

    

    return (
        <div className="Charts">
            <div className="charts_head"></div>
            <ChartCanvas 
                height={height + 220}
                ratio={ratio}
                width={width}
                margin={margin}
                data={data}
                type={type}
                xAccessor={xAccessor}
                xScale = {scaleUtc()}
                // xScale= {xScale()}
                xExtents={xEvents}
                mouseMoveEvent={true}
                panEvent={true}
                zoomEvent={true}
                displayXAccessor={displayXAccessor}
                clamp={true}
            >
                
                <Chart
                    id={1}
                    yExtents={(d) => [d.high, d.low]}
                    height={height}
                >
                    <XAxis axisAt="bottom" orient="bottom" ticks={6} showTicks={false} {...xGrid} stroke="#fff"/>
                    <XAxis axisAt="top" orient="top" ticks={0} stroke="#fff"/>
                    <YAxis axisAt="left" orient="left" ticks={5} className="chartY-axis" fontSize="14" stroke="#fff" {...yGrid}/> 
                    <YAxis axisAt="right" orient="right" ticks={0}  />
                    <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")}/>
                    <MouseCoordinateY at="left" orient="left" displayFormat={format(".4s")}/>
                    
					<ZoomButtons
						onReset={false}
                        fill="#111"
                        fillOpacity="1"
                        textFill="#ffff"
                        zoomMultiplier="1.5"
					/>
                    {timeUnitCandleStick}
                    
                    <OHLCTooltip origin={[0, 10]} fontSize={14}/>
                    
                    
                    <CrossHairCursor />             
                </Chart>    
                <Chart id={2} origin={(w, h) => [0, h - 220]} height={100} yExtents={d => d.volume}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                    <YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".0s")}  />
                    <MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".4s")} />
                    {timeUnitBar}
                </Chart>
                <Chart id={3} height={100}
					yExtents={[0, elder.accessor()]}
					origin={(w, h) => [0, h - 100]}
					padding={{ top: 10, bottom: 10 }}
				>
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
					<YAxis axisAt="right" orient="right" ticks={4} tickFormat={format(".2f")}/>

					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<ElderRaySeries yAccessor={elder.accessor()} />
					<SingleValueTooltip
						yAccessor={elder.accessor()}
						yLabel="Elder Ray"
						yDisplayFormat={d => `${format(".2f")(d.bullPower)}, ${format(".2f")(d.bearPower)}`}
						origin={[0, 15]}/>
				</Chart>
            </ChartCanvas>
        </div>
    )
}



ElderRay.prototype = {
    data: PropTypes.array,
    width: PropTypes.number,
    ratio: PropTypes.number,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};



ElderRay.defaultProps = {
    type: "svg",
};

ElderRay = fitWidth(ElderRay)

export default ElderRay;


