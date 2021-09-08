module.exports = function extractChartData(data) {

    const indicators = data.chart.result[0].indicators.quote[0];
    const timeStamp = data.chart.result[0].timestamp;
    const metaData = data.chart.result[0].meta;
    const length  = timeStamp.length;
    // console.log(metaData);
    let candleData = [];
    let newTimeStamps = [];
    for(let i =0 ; i < length; i++) {
        if(indicators.open[i] !== null) {

            const newData = {
                date : new Date( timeStamp[i] *1000),
                open : indicators.open[i],
                high : indicators.high[i],
                low : indicators.low[i],
                close : indicators.close[i],
                volume : indicators.volume[i],
            };
            candleData.push(newData);
        }
    }

    // console.log()
    return {
        chartData : candleData,
        metaData : metaData
    }
}

