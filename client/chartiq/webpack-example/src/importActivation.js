/* global __TREE_SHAKE__ */
/* This section enables various features within the library. Anything not specified will be tree-shaken.
 * Note that imports always happen before code execution; hence, this example is organized for ease of
 * comprehension rather than by expected execution order.
 */
import { CIQ } from "chartiq/js/chartiq";
import * as Standard from "chartiq/js/standard";
import * as AddOns from "chartiq/js/addOns";
import * as Components from "chartiq/js/components";
/* Uncomment to see all available feature names in console */
//console.log(Object.keys(Standard));
//console.log(Object.keys(AddOns));
//console.log(Object.keys(Components));
// __TREE_SHAKE_ is a global defined by the DefinePlugin in webpack.config.js.
// It must be defined to accomplish tree-shaking.  If it is not defined, all
// features will automatically be activated and there will be no tree-shaking.
// If tree-shaking is not desired, the DefinePlugin should be removed and then this
//  block can be removed as well.
if (typeof __TREE_SHAKE__ !== "undefined" && __TREE_SHAKE__) {
	/* comment out any feature you do not want in your bundle */
	CIQ.activateImports(
		Standard.createEngine,
		Standard.customCharts,
		Standard.drawing,
		Standard.easeMachine,
		Standard.equations,
		Standard.i18n,
		Standard.interaction,
		Standard.markers,
		Standard.market,
		Standard.movement,
		Standard.nameValueStore,
		Standard.quoteFeed,
		Standard.series,
		Standard.share,
		Standard.span,
		Standard.storage,
		Standard.studies,
		Standard.symbolLookupBase,
		Standard.theme,
		Standard.timezone,
		Standard.touch,
		Standard.visualization,
		Standard.medianPrice,
		Standard.momentum,
		Standard.priceRelative,
		Standard.vwap,
		Standard.zigzag,
		AddOns.extendedHours,
		AddOns.fullScreen,
		AddOns.inactivityTimer,
		AddOns.rangeSlider,
		AddOns.shortcuts,
		AddOns.tableView,
		AddOns.tooltip,
		Components.abstractMarker,
		Components.advertisement,
		Components.aggregationDialog,
		Components.attribution,
		Components.chartLegend,
		Components.chartTitle,
		Components.chartcontrolGroup,
		Components.clickable,
		Components.close,
		Components.comparison,
		Components.comparisonLookup,
		Components.cvpController,
		Components.dialog,
		Components.doubleSlider,
		Components.drawingContext,
		Components.fibSettingsDialog,
		Components.floatingWindow,
		Components.gridSizePicker,
		Components.heading,
		Components.headsupDynamic,
		Components.headsupStatic,
		Components.infoToggle,
		Components.infoToggleDropdown,
		Components.instantChart,
		Components.languageDialog,
		Components.loader,
		Components.lookup,
		Components.menu,
		Components.menuContainer,
		Components.messageToaster,
		Components.palette,
		Components.paletteDock,
		Components.redo,
		Components.scroll,
		Components.shareButton,
		Components.shareDialog,
		Components.showRange,
		Components.sideNav,
		Components.sidePanel,
		Components.studies,
		Components.studyContext,
		Components.studyDialog,
		Components.studyInput,
		Components.studyLegend,
		Components.studyOutput,
		Components.studyParameter,
		Components.swatch,
		Components.themeDialog,
		Components.themePiece,
		Components.themes,
		Components.timezoneDialog,
		Components.toggle,
		Components.toolbar,
		Components.undo,
		Components.viewDialog,
		Components.views,
		Components.waveParameters,
		Components.colorPicker,
		Components.drawingPalette,
		Components.drawingSettings,
		Components.menuDropdown,
		null
	);
}
