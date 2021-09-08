/**
 *	8.3.0
 *	Generation date: 2021-08-09T06:25:03.572Z
 *	Client name: chartiq-library-trial
 *	Package Type: Technical Analysis AutoTrial
 *	License type: annual
 *	Expiration date: "2021-09-08"
 *	Domain lock: ["127.0.0.1","localhost","chartiq.com"]
 *	iFrame lock: true
 */

/***********************************************************
 * Copyright by ChartIQ, Inc.
 * Licensed under the ChartIQ, Inc. Developer License Agreement https://www.chartiq.com/developer-license-agreement
*************************************************************/
/*************************************** DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! **************************************/
/* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting */
/* and load that file right after the library has been loaded, but before the chart engine is instantiated.              */
/* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          */
/*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


import { CIQ } from "../../js/chartiq.js";
//disable undeclared globals
/*jshint -W117 */
/* global webkit, ChartIQ*/
let stxx = null;
let quoteFeedNativeBridge = null;
Object.assign(window, { CIQ }); // webview only has access to CIQ when it's on the window object
/**
 * Contains calls that allow native iOS and Android applications to interface with the charting
 * library without having to clutter <span style="white-space: nowrap;">Swift / Objective C</span>
 * or Java/Kotlin source code with unnecessary JavaScript.
 *
 * Please note that all functions and variables are exposed globally on the WebView.
 *
 * All methods were designed to be used with mobile sample interfaces. See
 * {@tutorial Getting Started on Mobile} for more details.
 *
 * @namespace CIQ.MobileBridge
 */
CIQ.MobileBridge = CIQ.MobileBridge || function () {};
/**
 * Uses a unique string:function mapping to ensure that the quote feed calls the correct callback.
 *
 * @type {object}
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.quoteFeedCallbacks = {};
/**
 * Set to true when an Android device is being used.
 *
 * @type {boolean}
 * @default false
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.isAndroid = false;
/**
 * Represents the class attribute for {@link CIQ}'s default light theme.
 *
 * @type {string}
 * @default "ciq-day"
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.dayCss = "ciq-day";
/**
 * Represents the class attribute for {@link CIQ}'s default dark theme.
 *
 * @type {string}
 * @default "ciq-night"
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.nightCss = "ciq-night";
/**
 * Set to true when the chart has been created, ensuring to the native mobile side that it is okay
 * to interact with the chart.
 *
 * @type {boolean}
 * @default false
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.chartAvailable = false;
/**
 * Sets the state of the loaded chart and, if a mobile message handler exists, send the response back to the native app.
 *
 * @param {boolean} finished The current chart available state.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setChartAvailable = function (finished) {
	this.chartAvailable = JSON.stringify(finished);
	// native ui event listeners
	if (this.isAndroid && ChartIQ) {
		ChartIQ.chartAvailableChange(this.chartAvailable);
	} else if (webkit.messageHandlers.chartAvailableHandler) {
		webkit.messageHandlers.chartAvailableHandler.postMessage(
			this.chartAvailable
		);
	}
};
/**
 * Checks the chart availability.
 *
 * @return {boolean} The current chart available state.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.isChartAvailable = function () {
	return this.chartAvailable;
};
/**
 * Helper function that sets the chart engine variable for all necessary functions.
 *
 * By default the sample template uses `stxx`, but sets `stxx` to `chartEngine` just in case the
 * user changes the name.
 *
 * @param {CIQ.ChartEngine} chartEngine The chart instance.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setChartEngineInBridge = function (chartEngine) {
	stxx = chartEngine;
	Object.assign(window, { stxx }); // webview only has access to the chart engine when it's on the window object
};
/**
 * Helper function that sets the quote feed variable for all necessary functions.
 *
 * By default the sample template uses `quoteFeedNativeBridge`, but sets `quoteFeedNativeBridge`
 * to `quoteFeed` just in case the user changes the name.
 *
 * @param quoteFeed The chart quote feed object.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setQuoteFeedInBridge = function (quoteFeed) {
	quoteFeedNativeBridge = quoteFeed;
};
/**
 * Determines where the chart is being loaded based on the userAgent.
 *
 * If not loaded on Android, then enables proxy logging automatically.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.determineOs = function () {
	var userAgent = navigator.userAgent;
	if (/android/i.test(userAgent)) {
		this.isAndroid = true;
	} else {
		// Logging works automatically in Android native apps, so no proxyLogger necessary.
		this.proxyLogger();
	}
};
/**
 * Allow console logging in iOS. This will overwrite the default console logging on iOS to return
 * messages via `webkit.messageHandlers`.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.proxyLogger = function () {
	var originals = {
		log: console.log,
		warn: console.warn,
		error: console.error
	};
	console.log = function () {
		webkit.messageHandlers.logHandler.postMessage({
			method: "LOG",
			arguments: JSON.parse(JSON.stringify(arguments))
		});
		return originals.log.apply(this, arguments);
	};
	console.warn = function () {
		webkit.messageHandlers.logHandler.postMessage({
			method: "WARN",
			arguments: JSON.parse(JSON.stringify(arguments))
		});
		return originals.warn.apply(this, arguments);
	};
	console.error = function () {
		webkit.messageHandlers.logHandler.postMessage({
			method: "ERROR",
			arguments: JSON.parse(JSON.stringify(arguments))
		});
		return originals.error.apply(this, arguments);
	};
};
/**
 * A simple quote feed with data parsing functions.
 *
 * @param {object} parameters Function parameters.
 * @param {Date} parameters.start A starting date for requesting data.
 * @param {Date} [parameters.end] An ending date for requesting data.
 * @param {string} parameters.symbol The symbol to fetch data for.
 * @param {number} parameters.period The period from a chart layout.
 * @param {string} [parameters.timeUnit] The time unit from a chart layout.
 * @param {function} cb Function passed in to handle data after it is parsed.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.nativeQuoteFeed = function (parameters, cb) {
	var id = CIQ.uniqueID();
	if (parameters.func === "pullInitialData") {
		this.quoteFeedCallbacks[id] = cb;
		if (this.isAndroid) {
			ChartIQ.pullInitialData(
				parameters.symbol,
				parameters.period.toString(),
				parameters.timeUnit,
				parameters.start.toISOString(),
				parameters.end.toISOString(),
				JSON.stringify(parameters),
				id
			);
		} else {
			webkit.messageHandlers.pullInitialDataHandler.postMessage({
				cb: id,
				symbol: parameters.symbol,
				startDate: parameters.start.toISOString(),
				endDate: parameters.end.toISOString(),
				interval: parameters.timeUnit,
				period: parameters.period
			});
		}
	}
	if (parameters.func === "pullUpdate") {
		this.quoteFeedCallbacks[id] = cb;
		if (this.isAndroid) {
			ChartIQ.pullUpdate(
				parameters.symbol,
				parameters.period.toString(),
				parameters.timeUnit,
				parameters.start.toISOString(),
				JSON.stringify(parameters),
				id
			);
		} else {
			webkit.messageHandlers.pullUpdateDataHandler.postMessage({
				cb: id,
				symbol: parameters.symbol,
				startDate: parameters.start.toISOString(),
				interval: parameters.timeUnit,
				period: parameters.period
			});
		}
	}
	if (parameters.func === "pullPagination") {
		this.quoteFeedCallbacks[id] = cb;
		if (this.isAndroid) {
			ChartIQ.pullPagination(
				parameters.symbol,
				parameters.period.toString(),
				parameters.timeUnit,
				parameters.start.toISOString(),
				parameters.end.toISOString(),
				JSON.stringify(parameters),
				id
			);
		} else {
			webkit.messageHandlers.pullPaginationDataHandler.postMessage({
				cb: id,
				symbol: parameters.symbol,
				startDate: parameters.start.toISOString(),
				endDate: parameters.end.toISOString(),
				interval: parameters.timeUnit,
				period: parameters.period
			});
		}
	}
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#attachQuoteFeed}.
 *
 * The quote feed cannot be defined in native mobile but in JavaScript. All this function does is
 * allow the parameters of a quote feed to be set. If you attach a quote feed using this function
 * do not accidentally attach another quote feed in your HTML template.
 *
 * Make sure the parameter names match up with the {@link CIQ.ChartEngine#attachQuoteFeed}.
 *
 * @param {string} [params] JSON string that defines all the optional parameters for
 * 		{@link CIQ.ChartEngine#attachQuoteFeed}.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.attachQuoteFeed = function (params) {
	params = JSON.parse(params);
	stxx.attachQuoteFeed(quoteFeedNativeBridge, params);
};
/**
 * Parses JSON data into an array of new OHLC quotes and updates the chart with them.
 *
 * Calls {@link CIQ.ChartEngine#updateChartData} if no callback ID is provided.
 *
 * @param {string} data JSON object of your data from a query
 * @param {string} [callbackID] Identifies a custom function to call to update the chart with the parsed data.
 * 		The function should take an object as a parameter with the properties `quotes` and `moreAvailable`. The
 * 		parsed data is assigned to `quotes` and the `moreAvailable` parameter of this function is assigned to
 * 		the `moreAvailable` property, for example: `{ quotes: newQuotes, moreAvailable: moreAvailable }`.
 * @param {boolean} [moreAvailable] Specifies whether or not to stop pagination requests
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.parseData = function (data, callbackId, moreAvailable) {
	var feeddata = JSON.parse(data);
	var newQuotes = [];
	for (var i = 0; i < feeddata.length; i++) {
		newQuotes[i] = {};
		newQuotes[i].DT = new Date(feeddata[i].DT);
		newQuotes[i].Open = feeddata[i].Open;
		newQuotes[i].High = feeddata[i].High;
		newQuotes[i].Low = feeddata[i].Low;
		newQuotes[i].Close = feeddata[i].Close;
		newQuotes[i].Volume = feeddata[i].Volume;
	}
	if (callbackId) {
		// pull method
		if (typeof moreAvailable === "undefined") moreAvailable = false;
		var quoteFeedCb = this.quoteFeedCallbacks[callbackId];
		quoteFeedCb({ quotes: newQuotes, moreAvailable: moreAvailable });
		delete this.quoteFeedCallbacks[callbackId];
	} else {
		// push method
		stxx.updateChartData(newQuotes);
	}
};
/**
 * Gathers the necessary information for any HUD based on cursor position and returns that data.
 *
 * This function will provide Open, High, Low, Close and Volume for a given quote.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getHudDetails = function () {
	var data = {};
	var tick = stxx.barFromPixel(stxx.cx);
	var prices = stxx.chart.xaxis[tick];
	if (prices && prices.data) {
		data.price = stxx.formatPrice(prices.data[stxx.chart.defaultPlotField]);
		data.open = stxx.formatPrice(prices.data.Open);
		data.close = stxx.formatPrice(prices.data.Close);
		data.high = stxx.formatPrice(prices.data.High);
		data.low = stxx.formatPrice(prices.data.Low);
		data.volume = CIQ.condenseInt(prices.data.Volume);
	}
	if (this.isAndroid) {
		return data;
	}
	return JSON.stringify(data);
};
/**
 * Helper function that retrieves a chart layout value from the given property.
 *
 * @param {string} property Field name to retrieve a value for.
 * @return {string|object} JSON string or Java/Kotlin object representation of the field value.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getLayoutProperty = function (property) {
	var layoutProperty = stxx.layout[property];
	if (this.isAndroid) {
		return layoutProperty;
	}
	return JSON.stringify(layoutProperty);
};
/**
 * Helper function that retrieves a chart value from the given property.
 *
 * @param {string} property Field name to retrieve a value for.
 * @return {string|object} JSON string or Java/Kotlin object representation of the field value.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getChartProperty = function (property) {
	var chartProperty = stxx.chart[property];
	if (this.isAndroid) {
		return chartProperty;
	}
	return JSON.stringify(chartProperty);
};
/**
 * Helper function that retrieves a chart engine value from the given property.
 *
 * @param {string} property Field name to retrieve a value for.
 * @return {string|object} JSON string or Java/Kotlin object representation of the field value.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getEngineProperty = function (property) {
	var engineProperty = stxx[property];
	if (this.isAndroid) {
		return engineProperty;
	}
	return JSON.stringify(engineProperty);
};
//////////////////////////
/*** Chart functions ***/
////////////////////////
/**
 * Native wrapper for {@link CIQ.ChartEngine#setPeriodicity}.
 *
 * Only accepts arguments individually and passes them into a params object.
 *
 * @param {number} params.period The number of elements from `masterData` to roll-up together into
 * 		one data point on the chart (candle,bar, etc). If set to 30 in a candle chart, for example,
 * 		each candle will represent 30 raw elements of `interval/timeUnit` type.
 * @param {string} [params.timeUnit] Type of data requested. Valid values are "millisecond",
 * 		"second", "minute", "day", "week", "month", or 'tick'. If not set, defaults to "minute".
 * 		**"hour" is NOT a valid time unit. Use `timeUnit:"minute", interval:60` instead.**
 * @param {string} [params.interval] Further qualifies pre-rolled details of intra-day `timeUnits`
 * 		("millisecond", "second", "minute") and is converted to “1” if used with "day", "week" or
 * 		"month" 'timeUnit'. Some feeds provide data that is already rolled up. For example, there
 * 		may be a feed that provides 5-minute bars. To let the chart know you want that 5-minute
 * 		bar from your feed instead of having the chart get individual 1-minute bars and roll them
 * 		up, you would set the `interval` to '5' and `timeUnit` to 'minute'.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setPeriodicity = function (period, interval, timeUnit) {
	var params = {
		period: period,
		interval: interval,
		timeUnit: timeUnit
	};
	var loader = document.querySelector("cq-loader");
	if (loader) loader.show();
	stxx.setPeriodicity(params, function () {
		if (loader) loader.hide();
	});
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#loadChart}.
 *
 * Unlike {@link CIQ.ChartEngine#loadChart}, this function only accepts a symbol and data. If you
 * need more functionality you to manually call the library implementation of loadChart.
 *
 * If a push method is supplying data to `callNewChart`, you will need to make use of the
 * `chartIQView.isChartAvailable()` method for your initial data push. The pseudocode in the
 * example gives one instance on how to use the flag.
 *
 * @param {string} symbol The new symbol for your chart.
 * @param {array} data Static data to load into the chart.
 *
 * @memberof CIQ.MobileBridge
 *
 * @example
 * if (chartIQView.isChartAvailable() {
 *     pushData = retrievePushData()
 *     chartIQView.push(pushData)
 * } else { repeat check via polling for the isChartAvailable flag }
 */
CIQ.MobileBridge.loadChart = function (symbol, data) {
	const self = this;
	if (!symbol) symbol = stxx.chart.symbol;
	var loader = document.querySelector("cq-loader");
	if (loader) loader.show();
	var cb = function () {
		if (loader) loader.hide();
		CIQ.ChartEngine.restoreDrawings(stxx, symbol);
		if (!self.isAndroid)
			webkit.messageHandlers.newSymbolCallbackHandler.postMessage(symbol);
	};
	stxx.loadChart(symbol, { masterData: data }, cb);
	Object.values(stxx.chart.series)
		.filter((series) => series.parameters.bucket !== "study") // keep studies
		.forEach((series) => stxx.removeSeries(series.id));
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#setChartType}.
 *
 * Removes any aggregation type and switches your chart to display the new chart type.
 *
 * Valid chart types include: Candle, Bar, Colored Bar, Line, Hollow Candle, Mountain, and
 * Baseline.
 *
 * This function should not be used for setting aggregations. Instead use
 * {@link CIQ.MobileBridge.setAggregationType}.
 *
 * @param {string} chartType Type of chart to display.
 *
 * @memberof CIQ.MobileBridge
 *
 * @see {@tutorial Chart Styles and Types} tutorial
 */
CIQ.MobileBridge.setChartType = function (chartType) {
	stxx.setChartType(chartType);
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#setAggregationType}.
 *
 * Valid aggregation types include: Heikin Ashi, Kagi, Renko, Range Bars, Point & Figure.
 *
 * This function should not be used to set chart types. Instead use
 * {@link CIQ.MobileBridge.setChartType}.
 *
 * @param {string} aggregationType Type of chart to display.
 *
 * @memberof CIQ.MobileBridge
 *
 * @see {@tutorial Chart Styles and Types} tutorial
 */
CIQ.MobileBridge.setAggregationType = function (aggregationType) {
	stxx.setAggregationType(aggregationType);
};
/**
 * Returns the chart's main symbol.
 *
 * @return {string} The chart symbol.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getSymbol = function () {
	return stxx.chart.symbol;
};
/**
 * Toggles the crosshairs on or off.
 *
 * @param boolean Specifies whether the crosshairs are on or off.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.enableCrosshairs = function (active) {
	stxx.layout.crosshair = active;
	stxx.doDisplayCrosshairs();
	stxx.changeOccurred("layout");
};
/**
 * Returns the `currentVectorParameters` object of the engine instance.
 *
 * @return {object} The `currentVectorParameters` object of the chart engine (see
 * 		{@link CIQ.ChartEngine#currentVectorParameters}.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getCurrentVectorParameters = function () {
	return stxx.currentVectorParameters;
};
/**
 * Used to set values of {@link CIQ.ChartEngine#currentVectorParameters}.
 *
 * @param {string} parameter The parameter for which the value is set.
 * @param {string|number|object} value The value to set.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setCurrentVectorParameters = function (parameter, value) {
	if (parameter === "vectorType") {
		stxx.changeVectorType(value);
	} else {
		stxx.currentVectorParameters[parameter] = value;
	}
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#addSeries}.
 *
 * Can set a Series as a comparison and specify line color.
 *
 * @param {string} symbol Symbol to set.
 * @param {string} hexColor Color for your symbol to be displayed as.
 * @param {boolean} isComparison Tells the chart whether the symbol should be compared to the
 * 		main symbol
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.addSeries = function (symbol, hexColor, isComparison) {
	var parameters = {
		color: hexColor,
		isComparison: isComparison
	};
	stxx.addSeries(symbol, parameters);
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#removeSeries}.
 *
 * Removes a selected symbol from the chart's series.
 *
 * @param {string|object} symbol Symbol to remove OR the series object itself.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.removeSeries = function (symbol) {
	stxx.removeSeries(symbol);
};
/**
 * Native wrapper for {@link CIQ.ChartEngine#modifySeries}.
 *
 * Modifies a property of an existing series.
 *
 * @param {string} seriesId Id for the series to modify.
 * @param {string} field The property you want to change.
 * @param {string} value The value to change the property to.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.modifySeries = function (seriesId, field, value) {
	let parameters = {};
	parameters[field] = value;
	stxx.modifySeries(seriesId, parameters);
};
/**
 * Gets all the current series on the chart.
 *
 * @return {string} JSON string of the series with `color` and `isComparison` fields.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getAllSeries = function () {
	const allSeries = CIQ.clone(stxx.chart.series);
	let seriesObj = {};
	for (const key in allSeries) {
		seriesObj[key] = {};
		seriesObj[key].color = allSeries[key].parameters.color;
		seriesObj[key].isComparison = allSeries[key].parameters.isComparison;
	}
	return JSON.stringify(seriesObj);
};
/**
 * Sets the chart theme to "day", "night", or "none" by adding in CSS classes to the chart's
 * context. Also clears the chart container's `backgroundColor` and resets the engine's styles.
 *
 * Adding one class removes the other; to remove both, set the theme to none.
 *
 * @param {string} theme Theme to set: "day", "night", or "none".
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setTheme = function (theme) {
	var classList = document.querySelector("cq-context").classList;
	var nightCss = this.nightCss;
	var dayCss = this.dayCss;
	if (theme.toLowerCase() === "day") {
		classList.remove(nightCss);
		classList.add(dayCss);
	} else if (theme.toLowerCase() === "night") {
		classList.remove(dayCss);
		classList.add(nightCss);
	} else if (theme.toLowerCase() === "none") {
		classList.remove(nightCss);
		classList.remove(dayCss);
	} else {
		return;
	}
	stxx.setThemeSettings();
};
/**
 * Turns the extended hours functionality on or off.
 *
 * @param {boolean} status true for on, false for off.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.toggleExtendedHours = function (status) {
	stxx.extendedHours.set(status);
};
/**
 * Gets the translated list for a given language.
 *
 * @param {String} langCode The I18N language code that is to be retrieved. If no language code is
 * 		given, all translations are returned.
 * @return {string} JSON string of the translations.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getTranslations = function (langCode) {
	if (langCode) {
		return JSON.stringify(CIQ.I18N.wordLists[langCode]);
	}
	return JSON.stringify(CIQ.I18N.wordLists);
};
/**
 * Sets the language for the chart.
 *
 * @param {String} langCode The I18N language code that specifies the language to set.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setLanguage = function (langCode) {
	stxx.preferences.language = langCode;
	stxx.changeOccurred("preferences");
	CIQ.I18N.localize(stxx, langCode);
	stxx.draw();
};
///////////////////////////
/*** Drawing functions ***/
///////////////////////////
/**
 * Helper function to restore the drawing tool to its default settings.
 *
 * @param {string} toolName Name of the drawing tool.
 * @param {boolean} all Set to true if you want to restore all drawing configurations.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.restoreDefaultDrawingConfig = function (toolName, all) {
	CIQ.Drawing.restoreDefaultConfig(stxx, toolName, all);
};
/**
 * Helper function to retrieve the drawing parameters for the given tool.
 *
 * @param {string} toolName Name of the drawing tool.
 * @return {string} JSON string of the current drawing parameters.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getDrawingParameters = function (toolName) {
	const toolParameters = CIQ.clone(
		CIQ.Drawing.getDrawingParameters(stxx, toolName)
	);
	if (!toolParameters) return; // no params for "notool"
	let drawingKeys = Object.keys(toolParameters);
	let font = stxx.currentVectorParameters.annotation.font;
	if (!font.size && !font.family && !font.style && !font.weight) {
		// annotation settings has not been set yet, set some defaults
		font.size = "13px";
		font.family = "Helvetica";
		font.style = "normal";
		font.weight = "300";
	}
	if (
		!stxx.currentVectorParameters.active1 &&
		!stxx.currentVectorParameters.active2 &&
		!stxx.currentVectorParameters.active3
	) {
		stxx.currentVectorParameters.active1 = false;
		stxx.currentVectorParameters.active2 = false;
		stxx.currentVectorParameters.active3 = false;
	}
	if (
		!stxx.currentVectorParameters.color1 &&
		!stxx.currentVectorParameters.color2 &&
		!stxx.currentVectorParameters.color3
	) {
		stxx.currentVectorParameters.color1 = "";
		stxx.currentVectorParameters.color2 = "";
		stxx.currentVectorParameters.color3 = "";
	}
	if (
		!stxx.currentVectorParameters.lineWidth1 &&
		!stxx.currentVectorParameters.lineWidth2 &&
		!stxx.currentVectorParameters.lineWidth3
	) {
		stxx.currentVectorParameters.lineWidth1 = 1;
		stxx.currentVectorParameters.lineWidth2 = 1;
		stxx.currentVectorParameters.lineWidth3 = 1;
	}
	if (
		!stxx.currentVectorParameters.pattern1 &&
		!stxx.currentVectorParameters.pattern2 &&
		!stxx.currentVectorParameters.pattern3
	) {
		stxx.currentVectorParameters.pattern1 = "dotted";
		stxx.currentVectorParameters.pattern2 = "dotted";
		stxx.currentVectorParameters.pattern3 = "dotted";
	}
	let cvp = CIQ.clone(stxx.currentVectorParameters);
	for (const key in cvp) {
		if (
			!drawingKeys.includes(key) &&
			key != "currentColor" &&
			key != "fibonacci" &&
			key != "annotation"
		) {
			delete cvp[key];
		}
	}
	if (cvp.waveParameters) {
		cvp.waveParameters.corrective = cvp.waveParameters.corrective.join(" ");
		cvp.waveParameters.impulse = cvp.waveParameters.impulse.join(" ");
	}
	if (cvp.currentColor) {
		cvp.color = cvp.currentColor;
		delete cvp.currentColor;
	}
	if (cvp.annotation) {
		cvp.font = cvp.annotation.font;
		delete cvp.annotation;
	}
	// clean up fib settings cruft
	if (cvp.fibonacci) {
		cvp.fibs = cvp.fibonacci.fibs;
		delete cvp.fibonacci;
		for (let i = 0; i < cvp.fibs.length; i++) {
			// compensate for iOS and Android apps not multiplying decimal value by 100
			// this will likely be changed in the future
			let levelConverted = cvp.fibs[i].level * 100;
			cvp.fibs[i].level = Number(levelConverted.toFixed(1));
			delete cvp.fibs[i].color;
			delete cvp.fibs[i].parameters;
		}
	}
	return JSON.stringify(cvp);
};
/**
 * Wrapper to set vector parameters according to what is selected on the client side.
 *
 * @param {string} parameterName Name of the drawing field to change.
 * @param {string} value The value of the field to change.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setDrawingParameters = function (parameterName, value) {
	if (parameterName == "color") parameterName = "currentColor";
	switch (parameterName) {
		case "size":
		case "weight":
		case "family":
		case "style":
			stxx.currentVectorParameters.annotation.font[parameterName] = value;
			break;
		case "impulse":
		case "corrective":
			let valueArray = value.split(" ");
			stxx.currentVectorParameters.waveParameters[parameterName] = valueArray;
			break;
		case "decoration":
		case "showLines":
			stxx.currentVectorParameters.waveParameters[parameterName] = value;
			break;
		case "pattern":
		case "lineWidth":
			const { fibonacci } = stxx.currentVectorParameters;
			Object.getOwnPropertyNames(stxx.currentVectorParameters)
				.filter((name) => name.match(new RegExp(`^${parameterName}`)))
				.forEach((name) => {
					stxx.currentVectorParameters[name] = value;
				});
			fibonacci.fibs.forEach(({ parameters }) => {
				parameters[parameterName] = value;
			});
			fibonacci.timezone.parameters[parameterName] = value;
			break;
		case "fibs":
			const oldFibs = stxx.currentVectorParameters.fibonacci.fibs;
			const decoded = atob(value).replace("\\", "");
			const parsed = JSON.parse(decoded)
				.map((entry) => {
					const keys = Object.keys(entry);
					keys.forEach((key) => {
						let entryValue = entry[key].toString();
						let numIfNum = parseFloat(entryValue);
						if (!isNaN(numIfNum)) {
							let sigFigs =
								(numIfNum.toString().split(".")[1] || "").length + 2; // accommodate division by 100
							// compensate for getDrawingParameters multiplying value by 100
							entryValue = parseFloat((numIfNum / 100).toFixed(sigFigs));
						} else if (["true", "false"].includes(entryValue)) {
							entryValue = entryValue === "true";
						}
						entry[key] = entryValue;
					});
					return entry;
				})
				.sort((a, b) => (a.level > b.level ? 1 : -1));
			const merged = [];
			let i = 0;
			let j = 0;
			while (i < parsed.length || j < oldFibs.length) {
				let parsedFib = parsed[i] || {};
				let oldFib = oldFibs[j] || oldFibs[oldFibs.length - 1]; // preserve default properties
				if (parsedFib.level === oldFib.level) {
					merged.push(Object.assign({}, oldFib, parsedFib)); // `{}` to not mutate oldFib
					i++;
					j++;
				} else if (
					parsedFib.level !== undefined &&
					(!oldFibs[j] || parsedFib.level < oldFib.level)
				) {
					merged.push(Object.assign({}, oldFib, parsedFib)); // `{}` to not mutate oldFib
					i++;
				} else if (parsedFib.level === undefined) {
					break;
				} else {
					j++;
				}
			}
			stxx.currentVectorParameters.fibonacci.fibs = merged;
			break;
		default:
			stxx.currentVectorParameters[parameterName] = value;
	}
};
/**
 * Helper function to find the current highlighted drawing and delete it.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.deleteDrawing = function () {
	let drawingObjects = stxx.drawingObjects;
	for (let i = 0; i < drawingObjects.length; i++) {
		const drawing = drawingObjects[i];
		if (drawing.highlighted) {
			if (drawing.permanent) continue;
			const before = stxx.exportDrawings();
			stxx.removeDrawing(drawing);
			stxx.undoStamp(before, stxx.exportDrawings());
			break;
		}
	}
};
/**
 * Helper function to find the current highlighted drawing and clone it.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.cloneDrawing = function () {
	let drawingObjects = stxx.drawingObjects;
	for (let i = 0; i < drawingObjects.length; i++) {
		const drawing = drawingObjects[i];
		if (drawing.highlighted) {
			const clone = new CIQ.Drawing[drawing.name]();
			let dehydrate = drawing.serialize();
			clone.reconstruct(stxx, dehydrate);
			clone.repositioner = drawing.repositioner;
			clone.highlighted = true;
			drawing.highlighted = false;
			stxx.addDrawing(clone);
			stxx.activateRepositioning(clone);
			break;
		}
	}
};
/**
 * Helper function to find the current highlighted drawing and change the layer of the drawing.
 *
 * @param {String} layer The layer to assign to the drawing (top, bottom, up, or down).
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.layerDrawing = function (layer) {
	let drawingObjects = stxx.drawingObjects;
	for (let i = 0; i < drawingObjects.length; i++) {
		const drawing = drawingObjects[i];
		if (drawing.highlighted) {
			let lastIndex = drawingObjects.length - 1;
			let removeIndex = i;
			let insertIndex = NaN;
			if (removeIndex === -1) return;
			switch (layer) {
				case "up":
					if (removeIndex < lastIndex) {
						insertIndex = removeIndex + 1;
					}
					break;
				case "down":
					if (removeIndex > 0) {
						insertIndex = removeIndex - 1;
					}
					break;
				case "top":
					if (removeIndex < lastIndex) {
						insertIndex = lastIndex;
					}
					break;
				case "bottom":
					if (removeIndex > 0) {
						insertIndex = 0;
					}
					break;
			}
			if (isNaN(insertIndex)) return; // NaN check
			let before = stxx.exportDrawings();
			stxx.drawingObjects.splice(removeIndex, 1);
			stxx.drawingObjects.splice(insertIndex, 0, drawing);
			stxx.undoStamp(before, stxx.exportDrawings());
			stxx.draw();
			stxx.changeOccurred("vector");
			break;
		}
	}
};
/**
 * Helper function that determines whether there are any drawings on the undo stack.
 *
 * @return {string} JSON string of true/false to determine whether there are any drawings to undo.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.undo = function () {
	const undoObject = document.querySelector("cq-undo");
	if (!undoObject) return JSON.stringify(false);
	undoObject.undo();
	const moreUndo = undoObject.undostack.length > 0;
	return JSON.stringify(moreUndo);
};
/**
 * Helper function that determines whether there are any drawings on the redo stack.
 *
 * @return {String} JSON string of true/false to determine whether there is any drawings to redo.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.redo = function () {
	const undoObject = document.querySelector("cq-undo");
	if (!undoObject) return JSON.stringify(false);
	undoObject.redo();
	const moreRedo = undoObject.redostack.length > 0;
	return JSON.stringify(moreRedo);
};
//////////////////////////
/*** Study functions ***/
/////////////////////////
/**
 * Native wrapper for {@link CIQ.Studies.addStudy}.
 *
 * Adds a specific study to the chart.
 *
 * @param {string} studyName Study to add from the {@link CIQ.Studies.studyLibrary}.
 * @param {object} [inputs] Custom inputs for instantiating the study.
 * @param {object} [outputs] Custom outputs for instantiating the study.
 * @param {object} [parameters] Custom parameters if supported/required by the study.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.addStudy = function (studyName, inputs, outputs, parameters) {
	CIQ.Studies.addStudy(stxx, studyName, inputs, outputs, parameters);
};
/**
 * Removes an active study in the chart engine's layout from the chart.
 *
 * @param {String} studyName The name of the study as it appears in the chart engine's layout.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.removeStudy = function (studyName) {
	var studyList = stxx.layout.studies;
	for (var study in studyList) {
		var sd = studyList[study];
		if (sd.name === studyName) {
			if (CIQ.Studies) CIQ.Studies.removeStudy(stxx, sd);
		}
	}
};
/**
 * Convenience function to remove all studies on the chart at once.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.removeAllStudies = function () {
	var studyList = stxx.layout.studies;
	for (var study in studyList) {
		var sd = studyList[study];
		if (CIQ.Studies) CIQ.Studies.removeStudy(stxx, sd);
	}
};
/**
 * Returns an array of all the studies in the {@link CIQ.Studies.studyLibrary} with a short name
 * derived from the key.
 *
 * Used for gathering all available studies a user can access.
 *
 * @return {array} Array of studies with the short name of study.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getStudyList = function () {
	var result = [];
	/*
	 * If an array is part of the study inputs, then Android and iOS just transform the object to a string when the JSON transform happens.
	 * That "array" string is then passed back to the library when the study is added and the app breaks.
	 * By default, just make sure the first option in the array is chosen and sent to the client side.
	 * This will not affect the study options selection inputs as that is being handled by getStudyParameters.
	 */
	function changeInputArray(inputs) {
		for (var input in inputs) {
			var values = inputs[input];
			if (Array.isArray(values) && values.length > 0) {
				inputs[input] = inputs[input][0];
			}
		}
		return inputs;
	}
	for (var key in CIQ.Studies.studyLibrary) {
		CIQ.Studies.studyLibrary[key].shortName = key;
		var study = CIQ.clone(CIQ.Studies.studyLibrary[key]);
		if (study.inputs) study.inputs = changeInputArray(study.inputs);
		result.push(study);
	}
	return result;
};
/**
 * Returns the active studies in the chart engine's layout.
 *
 * **Note:** For Android devices, returns a raw, unstringified array of studies.
 *
 * @return {string|array} The JSON stringified list of studies.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.getActiveStudies = function () {
	var results = [];
	// we don't need the whole study object. Just the name, type, and study options
	// if you pass the whole study stringified back to Java/Kotlin don't be surprised if there are issues
	for (var key in stxx.layout.studies) {
		var trimObject = {};
		var study = stxx.layout.studies[key];
		trimObject.shortName = key;
		trimObject.name = study.name;
		trimObject.type = study.type;
		trimObject.inputs = study.inputs;
		trimObject.outputs = study.outputs;
		trimObject.parameters = study.parameters;
		results.push(trimObject);
	}
	if (this.isAndroid) {
		return results;
	}
	// iOS has issue with circular references in javascript objects, we must avoid those references.
	function isUnique(arr) {
		return function (key, value) {
			if (typeof value === "object" && value !== null) {
				if (arr.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				arr.push(value);
			}
			return value;
		};
	}
	var list = [];
	var seen1 = [];
	var seen2 = [];
	var seen3 = [];
	for (var n in results) {
		var sd = results[n];
		var inputs = JSON.stringify(sd.inputs, isUnique(seen1));
		var outputs = JSON.stringify(sd.outputs, isUnique(seen2));
		var parameters = JSON.stringify(sd.parameters, isUnique(seen3));
		list.push(
			sd.name +
				"___" +
				sd.type +
				"___" +
				inputs +
				"___" +
				outputs +
				"___" +
				parameters
		);
	}
	var joinedList = list.join("|||");
	return joinedList;
};
/**
 * Given an active study name, updates the study based on the key/value pair you pass into a
 * {@link CIQ.Studies.DialogHelper}.
 *
 * If the given key is not found in the dialog helper's inputs, then the key is searched for in
 * the dialog helper's outputs, and the function tries to update the outputs instead.
 *
 * @param {string} name Name of the study from the chart engine's layout.
 * @param {string} key Key to set in the study's corresponding dialog helper.
 * @param {string} value Value to set in the study's corresponding dialog helper.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setStudy = function (name, key, value) {
	var s = stxx.layout.studies;
	var selectedSd = {};
	for (var n in s) {
		var sd = s[n];
		if (sd.name === name) {
			selectedSd = sd;
		}
	}
	var helper = new CIQ.Studies.DialogHelper({ sd: selectedSd, stx: stxx });
	var isFound = false;
	var newInputParameters = {};
	var newOutputParameters = {};
	for (var x in helper.inputs) {
		var input = helper.inputs[x];
		if (input.name === key) {
			isFound = true;
			if (input.type === "text" || input.type === "select") {
				newInputParameters[key] = value;
			} else if (input.type === "number") {
				newInputParameters[key] = parseInt(value);
			} else if (input.type === "checkbox") {
				newInputParameters[key] = value == "false" ? false : true;
			}
		}
	}
	if (isFound === false) {
		for (x in helper.outputs) {
			var output = helper.outputs[x];
			if (output.name === key) {
				newOutputParameters[key] = value;
			}
		}
	}
	isFound = false;
	helper.updateStudy({
		inputs: newInputParameters,
		outputs: newOutputParameters
	});
};
/**
 * Returns the default parameters of a study if it is not active, or the actual parameters for an
 * active study.
 *
 * **Note:** For Android devices, returns the raw, unstringified parameters.
 *
 * @param {string} studyName Study to get parameters for.
 * @param {string|boolean} [prop="outputs"] What to return for the study. Valid values: "inputs",
 * 		"outputs", "parameters", or true (see 6.1.0 history note below).
 * @return {string} JSON stringified parameters from {@link CIQ.Studies.DialogHelper}.
 *
 * @memberof CIQ.MobileBridge
 *
 * @since 6.1.0 Second parameter changed from boolean `isInputs` to string or boolean `prop`
 * 		parameter. If `prop == true`, returns inputs, as before.
 */
CIQ.MobileBridge.getStudyParameters = function (studyName, prop) {
	var params = { stx: stxx };
	if (stxx.layout.studies && stxx.layout.studies[studyName])
		params.sd = stxx.layout.studies[studyName];
	else params.name = studyName;
	var helper = new CIQ.Studies.DialogHelper(params);
	var parameters;
	switch (prop) {
		case "inputs":
		case true:
			parameters = helper.inputs;
			break;
		case "parameters":
			parameters = helper.parameters;
			break;
		default:
			parameters = helper.outputs;
	}
	if (this.isAndroid) {
		return parameters;
	}
	return JSON.stringify(parameters);
};
/**
 * Given an active study name, updates the study based on the key/value pair you pass into a
 * {@link CIQ.Studies.DialogHelper}.
 *
 * By default, assumes that the key belongs to the dialog helper outputs unless `isInput` is
 * true.
 *
 * @param {string} studyName Name of the study from the chart engine's layout.
 * @param {string} key Key to set in the study's corresponding dialog helper.
 * @param {string} value Value to set in the study's corresponding dialog helper.
 * @param {boolean} isInput Specifies whether to update inputs instead of outputs.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.setStudyParameter = function (studyName, key, value, isInput) {
	var helper = new CIQ.Studies.DialogHelper({
		sd: stxx.layout.studies[studyName],
		stx: stxx
	});
	if (isInput) {
		helper.updateStudy({
			inputs: {
				key: value
			},
			outputs: {}
		});
	} else {
		helper.updateStudy({
			inputs: {},
			outputs: {
				key: value
			}
		});
	}
};
////////////////////////////////
/*** Chart Event Listeners ***/
//////////////////////////////
/**
 * Sets a callback Listener with a type of "drawing".
 *
 * For more information on adding event callbacks to the chart, see
 * {@link CIQ.ChartEngine#addEventListener}.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.addDrawingListener = function () {
	const self = this;
	stxx.addEventListener("drawing", function (drawingObject) {
		var s = drawingObject.drawings;
		var drawings = [];
		for (var n in s) {
			var drawing = s[n];
			drawings.push(drawing.serialize());
		}
		var stringifiedDrawings = JSON.stringify(drawings);
		if (self.isAndroid) {
			ChartIQ.drawingChange(stringifiedDrawings);
		} else {
			webkit.messageHandlers.drawingHandler.postMessage(stringifiedDrawings);
		}
	});
};
/**
 * Sets a callback Listener to send the `mMeasure` text to the mobile client side for ease of
 * display.
 *
 * For more information on adding event callbacks to the chart, see
 * {@link CIQ.ChartEngine#addEventListener}.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.addMeasureListener = function () {
	const self = this;
	document.addEventListener("touchend", function () {
		let m = document.querySelector(".mMeasure");
		m.innerText = "";
		let measureText = JSON.stringify(m.innerText);
		if (self.isAndroid) {
			ChartIQ.measureChange(measureText);
		} else {
			webkit.messageHandlers.measureHandler.postMessage(measureText);
		}
	});
	stxx.addEventListener("move", function () {
		let m = document.querySelector(".mMeasure");
		if (m.innerText.length <= 0) return;
		let measureText = JSON.stringify(m.innerText);
		if (self.isAndroid) {
			ChartIQ.measureChange(measureText);
		} else {
			webkit.messageHandlers.measureHandler.postMessage(measureText);
		}
	});
};
/**
 * Sets a callback Listener with a type of "layout".
 *
 * For more information on adding event callbacks to the chart, see
 * {@link CIQ.ChartEngine#addEventListener}.
 *
 * @memberof CIQ.MobileBridge
 */
CIQ.MobileBridge.addLayoutListener = function () {
	const self = this;
	stxx.addEventListener("layout", function (layoutObject) {
		// Guard against trying to serialize circular objects and filter out duplicates
		var seen = [];
		function replacer(key, val) {
			if (val !== null && typeof val == "object") {
				if (seen.indexOf(val) >= 0) {
					return;
				}
				seen.push(val);
			}
			return val;
		}
		var stringifiedLayout = JSON.stringify(layoutObject.layout, replacer);
		if (self.isAndroid) {
			ChartIQ.layoutChange(stringifiedLayout);
		} else {
			webkit.messageHandlers.layoutHandler.postMessage(stringifiedLayout);
		}
	});
};
export { CIQ };
