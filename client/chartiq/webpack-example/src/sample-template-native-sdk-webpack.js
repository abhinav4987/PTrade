/* Place styles up here so they can be overridden by plugin and page styles if need be */
import "chartiq/css/normalize.css";
import "chartiq/css/page-defaults.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.scss";
import "chartiq/mobile/css/ciq-mobile.css";
/* Support for webcomponents on Legacy Edge */
import "chartiq/js/thirdparty/custom-elements.min.js";
import "chartiq/webpack-example/src/importActivation"; /* activates modules when using license-generated bundles such as standard.js */
import { CIQ } from "chartiq/js/chartiq";
/* Uncomment to enable the deprecated functions.  Update your calls to functions in here to employ current usage. */
//import "chartiq/js/deprecated";
import getDefaultConfig from "chartiq/js/defaultConfiguration";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm";
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";
import "chartiq/examples/translations/translationSample";
import "chartiq/mobile/js/nativeSdkAccessibility.js";
// Create and customize default configuration
// This variable triggers display of the simulated data disclaimer necessary when
// using data from the ChartIQ data simulator. Set to false when displaying your
// production data.
const displayDataDisclaimer = true;
CIQ.MobileBridge.determineOs();
const quoteFeedNativeBridge = {
	fetch: function (parameters, cb) {
		function completion(cb) {
			return function (err, results) {
				if (err) {
					cb({ error: err });
				} else {
					cb(results);
				}
			};
		}
		// This should call the native ios or android interface.
		// For sample app, instantiate an interface that connects to the simulator.
		// Call the completion closure with a completionHandler (or other mechanism).
		// Make sure this is done asynchronously so the UI doesn't hang.
		// Completion assumes the results are in correct JSON format.
		CIQ.MobileBridge.nativeQuoteFeed(parameters, cb);
	},
	fetchInitialData: function (
		symbol,
		suggestedStartDate,
		suggestedEndDate,
		params,
		cb
	) {
		const parameters = {
			func: "pullInitialData",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: suggestedStartDate,
			end: suggestedEndDate
		};
		this.fetch(parameters, cb);
	},
	fetchUpdateData: function (symbol, startDate, params, cb) {
		const parameters = {
			func: "pullUpdate",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: startDate
		};
		this.fetch(parameters, cb);
	},
	fetchPaginationData: function (
		symbol,
		suggestedStartDate,
		endDate,
		params,
		cb
	) {
		const parameters = {
			func: "pullPagination",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: suggestedStartDate,
			end: endDate
		};
		this.fetch(parameters, cb);
	}
};
//NOTE: if you are using a push mechanism for your data, comment out or remove the setQuoteFeedInBridge function call and
//quotefeed field in the config object below. Then set the dataMethod to 'push' in the native client side code.
CIQ.MobileBridge.setQuoteFeedInBridge(quoteFeedNativeBridge);
const config = getDefaultConfig({
	scrollStyle: PerfectScrollbar,
	quoteFeed: quoteFeedNativeBridge
});
// NOTE: if you want to change the quotefeed refreshInterval you can run the following and set the refreshInterval to any interval in seconds.
// Object.assign(config.quoteFeeds[0].behavior, { refreshInterval: 5 });
// If you want to modify anything in the config directly please do so in src/sample-template-native-sdk-webpack.js
Object.assign(config.enabledAddOns, {
	fullScreen: false,
	rangeSlider: false,
	tooltip: false
});
let stx = config.createChart();
if (stx) {
	stx.callbackListeners.drawingEdit = []; // turn off edit mode for drawing mSticky
	stx.callbackListeners.studyOverlayEdit = []; // turn off edit mode for study mSticky
	stx.callbackListeners.studyPanelEdit = []; // turn off edit mode for study panel
	stx.minimumZoomTicks = 5; // default zoom ticks doesn't allow seconds to appear on the x-axis when in portrait mode
	CIQ.MobileBridge.setChartEngineInBridge(stx); // set the chart engine instance for the nativeSdkBridge scripts
	CIQ.MobileBridge.setChartAvailable(true); // lets the mobile bridge know that the chart is finished loading
	if (displayDataDisclaimer) {
		let simWarnDialog = document.getElementById("simulation-warning");
		simWarnDialog.open();
	}
}
