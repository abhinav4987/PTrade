/* Place styles up here so they can be overridden by plugin and page styles if need be */
import "chartiq/css/normalize.css";
import "chartiq/css/page-defaults.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";
// Template specific style imports
import "chartiq/plugins/crosssection/sample.css";
/* Support for webcomponents on Legacy Edge */
import "chartiq/js/thirdparty/custom-elements.min.js";
import "chartiq/webpack-example/src/importActivation"; /* activates modules when using license-generated bundles such as standard.js */
import "chartiq/plugins/crosssection/core.js";
import "chartiq/plugins/crosssection/datepicker.js";
import "chartiq/plugins/crosssection/ui.js";
import "chartiq/plugins/crosssection/timelineDateSelector.js";
import quoteFeed from "chartiq/examples/feeds/termstructureDataSimulator.js";
/* Template-specific imports */
import getDefaultConfig from "chartiq/js/defaultConfiguration.js";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
import "chartiq/examples/feeds/symbolLookupChartIQ.js";
import "chartiq/examples/markets/marketDefinitionsSample.js";
import "chartiq/examples/markets/marketSymbologySample.js";
// Create and customize configuration object
const config = getDefaultConfig({
	quoteFeed,
	scrollStyle: PerfectScrollbar
});
Object.assign(config, {
	enabledAddOns: { inactivityTimer: true },
	initialSymbol: "US-T BENCHMARK",
	chartId: "_cross-section-chart",
	menuYaxisField: [
		{ type: "item", label: "Yield", cmd: "Layout.setYaxisField('yield')" },
		{ type: "item", label: "Bid", cmd: "Layout.setYaxisField('bid')" },
		{ type: "item", label: "Mid", cmd: "Layout.setYaxisField('mid')" },
		{ type: "item", label: "Ask", cmd: "Layout.setYaxisField('ask')" }
	],
	menuChartPreferences: [
		{ type: "checkbox", label: "Shading", cmd: "Layout.Shading()" },
		{ type: "checkbox", label: "X-Axis Scaling", cmd: "Layout.XAxisScaling()" },
		{
			type: "checkbox",
			label: "Update Animations",
			cmd: "Layout.UpdateAnimations()"
		},
		{
			type: "checkbox",
			label: "Show Update Stamp",
			cmd: "Layout.UpdateStamp()"
		},
		{
			type: "checkboxOptions",
			label: "Recent Updates",
			cmd: "Layout.FreshPoints()",
			options: "Layout.showFreshnessEdit()"
		},
		{
			type: "checkbox",
			label: "Timeline Date Selector",
			cmd: "Layout.TimelineDateSelector()"
		}
	]
});
config.plugins.crossSection.sortFunction = (l, r) => {
	let weight = ["DY", "WK", "MO", "YR", "ST", "MT", "LT"];
	let l1 = l.split(" "),
		r1 = r.split(" ");
	let diff =
		weight.indexOf(l1[l1.length - 1]) - weight.indexOf(r1[r1.length - 1]);
	if (diff) return diff > 0 ? 1 : -1;
	if (isNaN(l1[0])) return 1;
	if (isNaN(r1[0])) return -1;
	if (Number(l1[0]) < Number(r1[0])) return -1;
	if (Number(r1[0]) < Number(l1[0])) return 1;
	return 0;
};
let stxx = config.createChart();
