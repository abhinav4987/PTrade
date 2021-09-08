import qs from "../../examples/feeds/quoteFeedSimulator.js";
const quoteFeedSimulator = Object.assign({}, qs);
quoteFeedSimulator.formatChartData = function (response, symbol) {
	const maturities = [
		"1 MO",
		"2 MO",
		"3 MO",
		"6 MO",
		"1 YR",
		"2 YR",
		"3 YR",
		"5 YR",
		"7 YR",
		"10 YR",
		"20 YR",
		"30 YR"
	];
	function generateRandomInstrumentValues(type) {
		let seed = type === "yield" ? 2.2 : 80;
		let rate = type === "yield" ? 4 : 0.25;
		let values = [];
		for (let i = 0; i < 12; i++) {
			let bump = Math.random() / (Math.floor(Math.random() * rate) + rate);
			seed += bump;
			seed = parseFloat(seed.toFixed(2));
			values.push(seed);
		}
		return values;
	}
	function randomCurveData(dt) {
		const formatTimeStamp = (dateTime) => {
			dateTime = new Date(dateTime); // make sure dateTime is a date object
			let currentTime = new Date();
			if (dateTime.toDateString() === currentTime.toDateString()) {
				// Set initial date times to between 1 and 10 minutes in the past
				let minutesInThePast = Math.floor(Math.random() * 10) + 1;
				dateTime = new Date(currentTime - minutesInThePast * 60 * 1000);
				dateTime.setSeconds(0);
			} else {
				// If the date is historical set it to UTC midnight (but 24 hours so that the date that
				// will be interpreted as today). The chart will omit the time when displaying timestamps
				// at UTC midnight.
				dateTime.setUTCHours(24, 0, 0, 0);
			}
			return dateTime;
		};
		return {
			dt,
			yieldCurve: generateRandomInstrumentValues("yield"),
			priceCurve: generateRandomInstrumentValues("price"),
			curveUpdates: [...Array(maturities.length)].map(() => formatTimeStamp(dt))
		};
	}
	const formatResponse = ({ dt, yieldCurve, priceCurve, curveUpdates }) => {
		if (!this.cachedData) this.cachedData = {};
		if (!this.cachedData[symbol] || dt >= this.cachedData[symbol].dt)
			this.cachedData[symbol] = { dt, yieldCurve, priceCurve, curveUpdates };
		let response = {};
		for (let i = 0; i < maturities.length; i++) {
			let maturity = maturities[i];
			let data = {
				yield: yieldCurve[i],
				bid: priceCurve[i] - 2,
				mid: priceCurve[i],
				ask: priceCurve[i] + 2
			};
			let fields = Object.keys(data);
			for (let j = 0; j < fields.length; j++) {
				let field = fields[j];
				data[field] = { value: data[field], timeStamp: curveUpdates[i] };
			}
			response[maturity] = data;
		}
		return response;
	};
	function randomCurve(dt) {
		return formatResponse(randomCurveData(dt));
	}
	const updateCurveData = () => {
		const dt = new Date();
		let currentTime = dt.toISOString();
		let { yieldCurve, priceCurve, curveUpdates } =
			(this.cachedData && this.cachedData[symbol]) || {};
		if (!(yieldCurve && priceCurve && curveUpdates)) {
			return randomCurveData(dt);
		}
		const updateValue = (value) => {
			let up = !!Math.round(Math.random());
			let lower = value / 1000; // 0.1% change
			let upper = value / 100; // 1% change
			let change = Math.random() * upper + lower;
			if (!up) change = -change;
			return parseFloat((value + change).toFixed(2));
		};
		const shouldUpdate = () => Math.random() < 0.05; // 5% chance
		for (let i = 0; i < maturities.length; i++) {
			if (shouldUpdate()) {
				yieldCurve[i] = updateValue(yieldCurve[i]);
				priceCurve[i] = updateValue(priceCurve[i]);
				curveUpdates[i] = currentTime;
			}
		}
		return { dt, yieldCurve, priceCurve, curveUpdates };
	};
	function randomUpdate() {
		return formatResponse(updateCurveData());
	}
	const feeddata = JSON.parse(response);
	const newQuotes = [];
	const isUpdate = feeddata.length === 1;
	const currentDT = new Date();
	for (var i = 0; i < feeddata.length; i++) {
		var newQuote = {};
		newQuote.DT = isUpdate ? currentDT : new Date(feeddata[i].DT);
		newQuote.termStructure = isUpdate
			? randomUpdate()
			: randomCurve(newQuote.DT);
		if (isUpdate) newQuote.Date = currentDT.toISOString();
		newQuotes.push(newQuote);
	}
	return newQuotes;
};
export default quoteFeedSimulator;
