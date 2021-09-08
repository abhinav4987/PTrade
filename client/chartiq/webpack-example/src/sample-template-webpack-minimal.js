// Reference the default style sheet.
import "chartiq/css/stx-chart.css";
// Reference the charting library.
// Use these lines if your package contains individual library feature files...
//import {CIQ} from "chartiq/js/chartiq";
//import "chartiq/js/standard/interaction";
//import "chartiq/js/standard/movement";
//import "chartiq/js/standard/touch";
// ...or use these two lines if your package does not.
import { CIQ, interaction, movement, touch } from "chartiq/js/standard";
CIQ.activateImports(interaction, movement, touch);
// Reference a file of statically defined chart data.
import sample5min from "chartiq/examples/data/STX_SAMPLE_5MIN";
/*
Create the chart container. The container can be positioned anywhere on your web page and sized any way you wish,
but the CSS position property must have the value "relative".
*/
var container = document.createElement("div");
container.className = "chartContainer";
container.style.width = "800px";
container.style.height = "460px";
container.position = "relative";
document.body.appendChild(container);
// Display the chart. This is the page onload handler. The five-minute periodicity matches the sample data.
function displayChart() {
	// Instantiate a CIQ.ChartEngine object, the main object for creating charts.
	var stxx = new CIQ.ChartEngine({ container: container });
	stxx.loadChart("SPY", {
		masterData: sample5min,
		periodicity: {
			period: 1,
			interval: 5,
			timeUnit: "minute"
		}
	});
}
displayChart();
