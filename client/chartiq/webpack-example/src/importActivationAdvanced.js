/* global __TREE_SHAKE__ */
/* This section enables various advanced features within the library. Anything not specified will be tree-shaken.
 * Note that imports always happen before code execution; hence, this example is organized for ease of
 * comprehension rather than by expected execution order.
 */
import { CIQ } from "chartiq/js/chartiq";
import "./importActivation";
import * as AddOns from "chartiq/js/addOns";
import * as Advanced from "chartiq/js/advanced";
/* Uncomment to see all available feature names in console */
//console.log(Object.keys(Advanced));
//console.log(Object.keys(AddOns))
// __TREE_SHAKE_ is a global defined by the DefinePlugin in webpack.config.js.
// It must be defined to accomplish tree-shaking.  If it is not defined, all
// features will automatically be activated and there will be no tree-shaking.
// If tree-shaking is not desired, the DefinePlugin should be removed and then this
//  block can be removed as well.
if (typeof __TREE_SHAKE__ !== "undefined" && __TREE_SHAKE__) {
	/* comment out any feature you do not want in your bundle */
	CIQ.activateImports(
		Advanced.aggregations,
		Advanced.drawingAdvanced,
		Advanced.equationsAdvanced,
		Advanced.highPerformanceMarkers,
		Advanced.renderersAdvanced,
		Advanced.accumulationDistribution,
		Advanced.adx,
		Advanced.alligator,
		Advanced.aroon,
		Advanced.atr,
		Advanced.awesomeOscillator,
		Advanced.balanceOfPower,
		Advanced.bollinger,
		Advanced.cci,
		Advanced.centerOfGravity,
		Advanced.chaikin,
		Advanced.chande,
		Advanced.choppiness,
		Advanced.comparisonStudies,
		Advanced.coppock,
		Advanced.darvasBox,
		Advanced.detrended,
		Advanced.disparity,
		Advanced.easeOfMovement,
		Advanced.ehlerFisher,
		Advanced.elder,
		Advanced.fractalChaos,
		Advanced.highLowStudies,
		Advanced.ichimoku,
		Advanced.intradayMomentum,
		Advanced.keltner,
		Advanced.klinger,
		Advanced.linearRegression,
		Advanced.macd,
		Advanced.massIndex,
		Advanced.moneyFlow,
		Advanced.movingAverages,
		Advanced.parabolicSAR,
		Advanced.pivotPoints,
		Advanced.prettyGoodOscillator,
		Advanced.priceMomentumOscillator,
		Advanced.priceVolumeOscillator,
		Advanced.primeNumber,
		Advanced.pring,
		Advanced.projectedVolume,
		Advanced.psychologicalLine,
		Advanced.qstick,
		Advanced.rainbow,
		Advanced.randomWalk,
		Advanced.relativeVigor,
		Advanced.rsi,
		Advanced.schaffTrendCycle,
		Advanced.shinohara,
		Advanced.stochastics,
		Advanced.supertrend,
		Advanced.swingIndex,
		Advanced.trendIntensity,
		Advanced.trix,
		Advanced.typicalPrice,
		Advanced.twiggsMoneyFlow,
		Advanced.ulcerIndex,
		Advanced.ultimateOscillator,
		Advanced.valuationLines,
		Advanced.volatilityIndex,
		Advanced.volumeProfile,
		Advanced.volumeStudies,
		Advanced.vortex,
		Advanced.williamsMFI,
		AddOns.animation,
		AddOns.continuousZoom,
		AddOns.outliers,
		AddOns.plotComplementer,
		null
	);
}
