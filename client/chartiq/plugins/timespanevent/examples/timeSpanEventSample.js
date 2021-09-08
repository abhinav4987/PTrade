//
// Sample markers file
// This file contains functions which create sample markers.  There is a stylesheet which goes along with it as well.
// Usage: new CIQ.TimeSpanEventSample(stx);
//

var alertPng, newsPng;
if (
	typeof define === "undefined" &&
	typeof module === "object" &&
	typeof require === "function"
) {
	alertPng = require("../images/alert.png");
	newsPng = require("../images/news.png");
	// If the image comes back an an ES module, retrieve the file path.
	if (alertPng.default) alertPng = alertPng.default;
	if (newsPng.default) newsPng = newsPng.default;
} else if (typeof define === "function" && define.amd) {
	define(["../images/alert.png", "../images/news.png"], function (m1, m2) {
		alertPng = m1;
		newsPng = m2;
	});
}

import { CIQ } from "../../../js/chartiq.js";

var glyphPath = CIQ.ChartEngine.pluginBasePath + "timespanevent/images/";

CIQ.TimeSpanEventSample = function (stx) {
	this.stx = stx;
};

CIQ.TimeSpanEventSample.prototype.removeTimeSpanEvent = function (type) {
	this.stx.timeSpanEventPanel.removeTimeSpanEvent(type);
};

CIQ.TimeSpanEventSample.prototype.showTimeSpanEvent = function (eventName) {
	var eventData, display, spanType;
	switch (eventName) {
		case "CEO":
			eventData = ceoData;
			display = ceoDisplay;
			spanType = "spanEvent";
			break;
		case "Order":
			eventData = orderData;
			display = orderDisplay;
			spanType = "durationEvent";
			break;
		case "News":
			eventData = newsData;
			display = newsDisplay;
			spanType = "singleEvent";
			break;
		default:
			return console.warn("unsupported Time Series Event");
	}

	/****************************************************/
	// This portion of the code takes the incomplete sample ceoData, orderData and newsData objects
	// and converts them into a properly formatted object that can be consumed by
	// stx.timeSpanEventPanel.showTimeSpanEvent.
	// In a real implementation, this code should not be necessary and instead your data records should be properly formatted.
	// NOTE: all dates must be JS dates, not string dates!!!
	const { stx } = this;
	const { chart } = stx;
	const { dataSet } = chart;
	if (!dataSet.length) return;

	var endDataSet = dataSet.length - 1;
	var currentScrollOffset = 0;
	for (var i = eventData.length - 1; i >= 0; i--) {
		let datum = eventData[i];

		var length = display.length;
		if (display.randomLength)
			length = Math.round(15 + Math.random() * (display.length / 2));

		let endIndex = Math.max(endDataSet - currentScrollOffset, 0);
		let endPoint = dataSet[endIndex];
		if (!endPoint) return;
		datum.endDate = endPoint.DT;

		if (length) currentScrollOffset += length;

		let startIndex = Math.max(endDataSet - currentScrollOffset, 0);
		let startPoint = dataSet[startIndex];
		if (!startPoint) return;
		datum.startDate = startPoint.DT;

		if (display.customizeDisplay) {
			datum.headline =
				datum.headline.split(" ")[0] + " " + this.stx.chart.symbol;
			datum.story =
				datum.story.split("\n")[0] +
				"\nSubmitted: " +
				CIQ.displayableDate(stx, chart, startPoint.DT);
		}

		if (display.gap) currentScrollOffset += display.gap;

		if (datum.subChildren) {
			datum.subChildren = []; // clear the previous data if it exists
			for (var index = startPoint.tick; index < endPoint.tick; index += 3) {
				var quote = dataSet[index];
				if (!quote) return;
				var p = CIQ.round(
					quote.Low + Math.abs(Math.random() * (quote.High - quote.Low)),
					chart.decimalPlaces
				);
				if (p > quote.High) p = quote.High;
				var child = {
					date: quote.DT,
					price: p,
					headline: "Trade Executed",
					story: "Shares at: " + p
				};
				eventData[i].subChildren.push(child);
			}

			if (datum.eventZoomPeriodicity) {
				let interval = CIQ.ChartEngine.isDailyInterval(stx.layout.interval)
					? 60
					: 1;
				datum.eventZoomPeriodicity = {
					period: 1,
					timeUnit: "minute",
					interval: interval
				};
			}
		}
	}
	/****************************************************/

	// Once formatted, the data can be loaded into the chart using showTimeSpanEvent
	var spanEvent = {
		type: eventName,
		events: eventData,
		spanType: spanType
	};
	this.stx.timeSpanEventPanel.showTimeSpanEvent(spanEvent);
};

// The following sample data objects are missing the dates parameters, which are added by the above code.
// In your implementation, instead of using the above code, your data should already have all necessary dates and elements.
var ceoData = [
	{
		label: "CEO",
		spanLabel: "CEO 1",
		textColor: "white",
		bgColor: "gray"
	},
	{
		label: "CEO",
		spanLabel: "CEO 2",
		textColor: "white",
		bgColor: "blue"
	},
	{
		label: "CEO",
		spanLabel: "CEO with a super long name that shows name truncation",
		textColor: "white",
		bgColor: "red",
		headline: "Name: ",
		story: "Zeus Wolfeschlegelsteinhausenbergerdorff",
		category: "trade",
		markerShape: "square",
		subChildren: [],
		eventZoomPeriodicity: true
	},
	{
		label: "CEO",
		spanLabel: "CEO 4",
		textColor: "white",
		bgColor: "green"
	}
];

var ceoDisplay = {
	gap: 0,
	length: 80
};

var orderData = [
	{
		label: "Order",
		spanLabel: "",
		textColor: "white",
		bgColor: "#FFA500",
		headline: "Buy: ",
		story: "Trade start ",
		category: "trade",
		markerShape: "circle",
		subChildren: [], // in this sample, subChildren are randomly created by the  above code.
		isActive: false,
		glyph: alertPng || glyphPath + "alert.png",
		showPriceLines: true
	},
	{
		label: "Order",
		spanLabel: "",
		textColor: "white",
		bgColor: "#3D7F44",
		headline: "Buy: ",
		story: "Trade start",
		category: "trade",
		markerShape: "circle",
		subChildren: [], // in this sample, subChildren are randomly created by the above code.
		eventZoomPeriodicity: true,
		isActive: false,
		showPriceLines: false
	},
	{
		label: "Order",
		spanLabel: "",
		textColor: "white",
		bgColor: "#3D647F",
		headline: "Buy: ",
		story: "Trade start",
		category: "trade",
		markerShape: "circle",
		subChildren: [], // in this sample, subChildren are randomly created by the above code.
		isActive: false,
		showPriceLines: true
	},
	{
		label: "Order",
		spanLabel: "",
		textColor: "white",
		bgColor: "#743D7F",
		headline: "Buy: ",
		story: "Trade start",
		category: "trade",
		markerShape: "circle",
		subChildren: [], // in this sample, subChildren are randomly created by the above code.
		isActive: true,
		glyph: alertPng || glyphPath + "alert.png",
		showPriceLines: true
	}
];

var orderDisplay = {
	gap: 20,
	length: 45,
	randomLength: true,
	customizeDisplay: true
};

var newsData = [
	{
		label: "News",
		spanLabel: "News Event 1",
		textColor: "white",
		bgColor: "#FFA500",
		headline: "Big World Event",
		story: "Another war broke out.",
		category: "trade",
		markerShape: "circle",
		glyph: newsPng || glyphPath + "news.png"
	},
	{
		label: "News",
		spanLabel: "News Event 2",
		textColor: "white",
		bgColor: "#3D7F44",
		headline: "Big Financial Event",
		story: "Trade tarriffs announced.",
		category: "trade",
		markerShape: "circle",
		glyph: newsPng || glyphPath + "news.png"
	},
	{
		label: "News",
		spanLabel: "News Event 3",
		textColor: "white",
		bgColor: "#3D647F",
		headline: "Big Company Event",
		story: "Big company has gone bankrupt.",
		category: "trade",
		markerShape: "circle",
		glyph: newsPng || glyphPath + "news.png"
	},
	{
		label: "News",
		spanLabel: "News Event 4",
		textColor: "white",
		bgColor: "#743D7F",
		headline: "Big Company Event",
		story:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In risus quam, suscipit eu imperdiet sed, finibus vitae neque. Aenean gravida erat vel arcu bibendum pharetra. Nullam arcu nibh, ullamcorper a quam quis, aliquam mollis ex. Nulla lacus ligula, sollicitudin ac lacinia a, tempus nec sem. Aliquam erat volutpat. Phasellus magna mauris, maximus eget imperdiet eu, tincidunt ut neque. Maecenas rutrum nisl sed laoreet placerat. Nunc semper eu diam eget pretium. Fusce est lectus, feugiat nec metus sed, auctor laoreet ligula. Fusce et felis ut quam finibus porttitor. Fusce mollis felis quis velit rutrum laoreet. Maecenas dignissim mattis facilisis. Aenean tempor fermentum dictum.",
		category: "trade",
		markerShape: "circle",
		glyph: newsPng || glyphPath + "news.png"
	}
];

var newsDisplay = {
	gap: 30,
	length: 15
};
