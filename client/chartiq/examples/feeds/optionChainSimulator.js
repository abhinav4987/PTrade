import quoteFeedSimulator from "../../examples/feeds/quoteFeedSimulator.js";
const DEBUG = false;
const ONE_DAY = 24 * 60 * 60 * 1000;
const SECONDS_IN_TRADING_DAY = 6.5 * 60 * 60;
const HIST_DEPTH = 10;
const Market = {
	OPEN_HR: 14,
	OPEN_MIN: 30,
	CLS_HR: 21
};
let expirations = {};
let cachedData = {};
const isDST = (date) => {
	if (!date) date = new Date();
	const month = date.getUTCMonth();
	if (month > 2 && month < 10) return true;
	if (month === 2 && date.getUTCDate() - 7 > date.getUTCDay()) return true;
	if (month === 10 && date.getUTCDate() <= date.getUTCDay()) return true;
	return false;
};
const adjustMarketTimes = (date) => {
	const dst = isDST(date);
	if (Market.OPEN_HR === 13 && !dst) {
		Market.OPEN_HR++;
		Market.CLS_HR++;
	} else if (Market.OPEN_HR === 14 && dst) {
		Market.OPEN_HR--;
		Market.CLS_HR--;
	} else return;
};
const populateExpirations = (d, basis, symbol) => {
	expirations[symbol] = [];
	if (!/^[A-Z]{1,4}$/.test(symbol)) return;
	let today = new Date(+d);
	today.setHours(12, 0, 0, 0);
	const pad = (i, p) => ("0".repeat(p) + i).slice(-p);
	let expDate = new Date(+d);
	adjustMarketTimes(expDate);
	expDate.setUTCHours(Market.CLS_HR, 15, 0, 0);
	if (cachedData) cachedData[symbol] = { underlying: symbol };
	let dev = 25;
	if (basis < 10) dev = 1;
	else if (basis < 25) dev = 2.5;
	else if (basis < 200) dev = 5;
	else if (basis < 1000) dev = 10;
	let start = dev * Math.round((basis * 0.5) / dev),
		end = dev * Math.round((basis * 1.5) / dev);
	const cycle = symbol[0] < "I" ? 1 : symbol[0] < "R" ? 2 : 0;
	while (expDate.getDay() !== 5) expDate.setDate(expDate.getDate() + 1);
	while (expDate.getFullYear() - 4 < today.getFullYear()) {
		const date = expDate.getDate(),
			month = expDate.getMonth();
		const formattedFullDate =
			expDate.getFullYear() + pad(month + 1, 2) + pad(date, 2);
		const expTime = expDate.getTime(),
			todayTime = today.getTime();
		for (let i = start; i < end; i += dev) {
			if (i <= 0) continue;
			if (date > 14 && date < 22) {
				// monthly
				if (month > 0) {
					// not a LEAP
					if (expTime - todayTime > 240 * ONE_DAY) continue; // no more than 7 months out
					if (expTime - todayTime > 65 * ONE_DAY && cycle != (month + 1) % 3)
						continue; // out of cycle
				}
				const monthlyExp = new Date(expDate.getTime());
				monthlyExp.setDate(monthlyExp.getDate() + 1); // monthly uses Saturday expiration
				const formattedMonthly =
					monthlyExp.getFullYear() +
					pad(monthlyExp.getMonth() + 1, 2) +
					pad(monthlyExp.getDate(), 2);
				expirations[symbol].push(
					symbol + formattedMonthly + "C" + pad(i, 8),
					symbol + formattedMonthly + "P" + pad(i, 8)
				);
			} else if (expTime - todayTime <= 29 * ONE_DAY) {
				// weekly
				expirations[symbol].push(
					symbol + formattedFullDate + "C" + pad(i, 8),
					symbol + formattedFullDate + "P" + pad(i, 8)
				);
			}
		}
		expDate.setDate(expDate.getDate() + 7);
	}
};
const generateRandomInstrumentValues = (symbol, type, basis, factor) => {
	let values = [];
	const now = new Date();
	const symHash = hashUnderlying(symbol);
	const symbolParser = new RegExp("([A-Z]+)([0-9]*)([0-9]{8})(C|P)(.+)");
	const myExpirations = expirations[symbol];
	for (let i = 0; i < myExpirations.length; i++) {
		let value = 0;
		let parts = symbolParser.exec(myExpirations[i]);
		if (parts && parts.length > 5) {
			const strike = parseFloat(parts[5]);
			const date = parseInt(parts[3].slice(6, 8), 10);
			const expDate = new Date(
				parseInt(parts[3].slice(0, 4), 10),
				parseInt(parts[3].slice(4, 6), 10) - 1,
				date,
				0,
				0,
				0
			);
			const isWeekly = expDate.getDay() < 6;
			if (!isWeekly) expDate.setDate(expDate.getDate() - 1);
			const timeDiff = expDate.getTime() - now.getTime();
			const monthsOut = Math.ceil(timeDiff / (30 * ONE_DAY));
			const daysOut = Math.ceil(timeDiff / ONE_DAY);
			let price = basis - strike; // intrinsic
			if (parts[4] === "P") price = -price;
			// volatility?
			if (parts[4] === "C")
				price += (0.1 * (strike - basis / 2) * strike) / basis;
			else price += 0.1 * ((3 / 2) * basis - strike) * (2 - strike / basis);
			price = Math.max(0.01, price);
			price *= 1 + daysOut / 1500; // time value
			switch (type) {
				case "strike":
					value = strike;
					break;
				case "callorput":
					value = parts[4];
					break;
				case "lifespan":
					value = daysOut;
					break;
				case "expiration":
					value = expDate;
					value.setMilliseconds(0);
					break;
				case "price":
					value = price + (Math.random() - 0.5) / 2;
					value = parseFloat(Math.max(0.01, value).toFixed(4));
					break;
				case "volume":
					value = Math.round(
						(2 * Math.random() + 1) *
							getWeight(strike, expDate, isWeekly, now, basis) *
							factor *
							100
					);
					break;
				case "openinterest":
					value = Math.round(
						(2 * Math.random() + 1) *
							getWeight(strike, expDate, isWeekly, now, basis) *
							//factor *
							100
					);
					value = Math.round(Math.pow(Math.max(0, value), 2) / 10);
					break;
				case "impliedvolatility":
					value =
						symHash *
						((Math.abs(strike - basis) / basis + daysOut / 1500) *
							(10 + Math.random())) *
						10;
					value = parseFloat(Math.max(0, value).toFixed(2));
					break;
				case "delta":
				case "theta":
				case "vega":
					value = calculateGreek(
						type,
						basis,
						strike,
						parts[4],
						daysOut,
						price,
						symHash
					);
					break;
			}
		}
		values.push(value);
	}
	return values;
};
const hashUnderlying = function (underlying) {
	let accum = 0;
	for (let i = 0; i < 3; i++) {
		accum += underlying.charCodeAt(i) || 0;
	}
	return accum / 1000;
};
const calculateGreek = function (
	type,
	basis,
	strike,
	callorput,
	daysOut,
	price,
	symHash
) {
	switch (type) {
		case "delta":
			return parseFloat(
				(
					Math.max(-0.5, Math.min(0.5, (basis - strike) / basis)) *
						(1 - daysOut / 1500) +
					(callorput == "C" ? 0.5 : -0.5)
				).toFixed(4)
			);
		case "theta":
			return parseFloat(
				(
					((1 - Math.abs((basis - strike) / basis)) / daysOut) *
					(callorput == "C" ? -1.01 : 1)
				).toFixed(4)
			);
		case "vega":
			return parseFloat(
				(
					1 -
					Math.abs((basis - strike) / basis) +
					daysOut / (2 * 1500) +
					symHash / 100
				).toFixed(4)
			);
	}
};
const randomData = (DT, symbol, basis, factor = 0) => {
	cachedData[symbol] = { underlying: symbol };
	return {
		underlying: symbol,
		strike: generateRandomInstrumentValues(symbol, "strike", basis),
		callorput: generateRandomInstrumentValues(symbol, "callorput", basis),
		expiration: generateRandomInstrumentValues(symbol, "expiration", basis),
		lifespan: generateRandomInstrumentValues(symbol, "lifespan", basis),
		price: generateRandomInstrumentValues(symbol, "price", basis),
		vol: generateRandomInstrumentValues(symbol, "volume", basis, factor),
		oi: generateRandomInstrumentValues(symbol, "openinterest", basis),
		iv: generateRandomInstrumentValues(symbol, "impliedvolatility", basis),
		delta: generateRandomInstrumentValues(symbol, "delta", basis),
		theta: generateRandomInstrumentValues(symbol, "theta", basis),
		vega: generateRandomInstrumentValues(symbol, "vega", basis),
		updates: [...Array(expirations[symbol].length)].map(() => DT)
	};
};
const formatResponse = ({
	underlying,
	strike,
	callorput,
	expiration,
	lifespan,
	price,
	vol,
	oi,
	iv,
	delta,
	theta,
	vega,
	updates
}) => {
	let response = {};
	if (!callorput) return response;
	cachedData[underlying] = {
		underlying,
		strike,
		callorput,
		expiration,
		lifespan,
		price,
		vol,
		oi,
		iv,
		delta,
		theta,
		vega,
		updates
	};
	for (let i = 0; i < expirations[underlying].length; i++) {
		let data = {
			underlying,
			strike: strike[i],
			callorput: callorput[i],
			expiration: expiration[i],
			lifespan: lifespan[i],
			bid: Math.max(0, price[i] * 0.95),
			price: price[i],
			ask: price[i] * 1.05,
			volume: vol[i],
			openinterest: oi[i],
			impliedvolatility: iv[i],
			delta: delta[i],
			theta: theta[i],
			vega: vega[i]
		};
		let fields = Object.keys(data);
		for (let j = 0; j < fields.length; j++) {
			let field = fields[j];
			data[field] = { value: data[field], timeStamp: updates[i] };
		}
		response[expirations[underlying][i]] = data;
	}
	return response;
};
const randomChain = (quote, symbol, factor) => {
	return formatResponse(randomData(quote.DT, symbol, quote.Close, factor));
};
const getWeight = (strike, expDate, isWeekly, now, basis) => {
	const timeDiff = expDate.getTime() - now.getTime();
	const daysOut = Math.ceil(timeDiff / ONE_DAY);
	return (
		(Math.max(0, 1 - daysOut / 1100) *
			Math.max(0, 1 - (2 * Math.abs(strike - basis)) / basis) +
			Math.min(1, daysOut / 1100) * 0.01) *
		(isWeekly ? 0.2 : 1)
	);
};
const updateData = (symbol, basis) => {
	const now = new Date();
	let {
		underlying,
		strike,
		callorput,
		expiration,
		lifespan,
		price,
		vol,
		oi,
		iv,
		delta,
		theta,
		vega,
		updates
	} = (cachedData && cachedData[symbol]) || {};
	if (!callorput) {
		return randomData(new Date(), symbol, basis);
	}
	const updateValue = (value, isVol, isOI) => {
		let up = isVol || !!Math.round(Math.random());
		let lower = value / 1000; // 0.1% change
		let upper = value / 100; // 1% change
		let change = Math.random() * upper + lower;
		if (!up) change = -change;
		if (isVol) change = Math.round(3 * Math.random() + 1);
		if (isOI) change = Math.round(3 * Math.random() - 0.3);
		return parseFloat(Math.max(0, value + change).toFixed(4));
	};
	const greekCalc = (g, i, days) => {
		return calculateGreek(
			g,
			basis,
			strike[i],
			callorput[i],
			days,
			price[i],
			symHash
		);
	};
	const symHash = hashUnderlying(symbol);
	for (let i = 0; i < expirations[symbol].length; i++) {
		const timeDiff = expiration[i].getTime() - now.getTime();
		const daysOut = Math.ceil(timeDiff / ONE_DAY);
		const isWeekly =
			expiration[i].getDate() < 15 || expiration[i].getDate() > 22;
		if (
			300 * Math.random() <
			getWeight(strike[i], expiration[i], isWeekly, now, basis)
		) {
			price[i] = updateValue(price[i]);
			vol[i] = Math.round(updateValue(vol[i], true));
			oi[i] = Math.round(updateValue(oi[i]), null, true);
			iv[i] = updateValue(iv[i]);
			lifespan[i] = daysOut;
			delta[i] = greekCalc("delta", i, daysOut);
			theta[i] = greekCalc("theta", i, daysOut);
			vega[i] = greekCalc("vega", i, daysOut);
			updates[i] = new Date(+now);
		}
	}
	return {
		underlying,
		strike,
		callorput,
		expiration,
		lifespan,
		price,
		vol,
		oi,
		iv,
		delta,
		theta,
		vega,
		updates
	};
};
const randomUpdate = (symbol, basis) => {
	return formatResponse(updateData(symbol, basis));
};
const isMarketClosed = (date) => {
	if (!date) date = new Date();
	adjustMarketTimes(date);
	return (
		date.getUTCHours() >= Market.CLS_HR ||
		date.getUTCDay() % 6 === 0 ||
		isBeforeOpen(date)
	);
};
const isBeforeOpen = (date) => {
	if (!date) date = new Date();
	adjustMarketTimes(date);
	return (
		date.getUTCDay() % 6 > 0 &&
		(date.getUTCHours() < Market.OPEN_HR ||
			(date.getUTCHours() === Market.OPEN_HR &&
				date.getUTCMinutes() < Market.OPEN_MIN))
	);
};
const getFractionOfInterval = ({ interval, period }, date, isHistorical) => {
	let elapsedOfDay = SECONDS_IN_TRADING_DAY;
	if (!isHistorical) {
		if (!date) date = new Date();
		const beginOfDay = new Date(+date);
		adjustMarketTimes(beginOfDay);
		beginOfDay.setUTCHours(Market.OPEN_HR, Market.OPEN_MIN, 0);
		if (isBeforeOpen(date)) elapsedOfDay = 0;
		if (!isMarketClosed(date)) {
			elapsedOfDay = (date.getTime() - beginOfDay.getTime()) / 1000;
		}
		if (elapsedOfDay <= 0) return 0;
	}
	if (elapsedOfDay === SECONDS_IN_TRADING_DAY)
		elapsedOfDay = elapsedOfDay - 0.1;
	if (interval === "month")
		return (
			(((date.getUTCDate() - 1) * 22) / 31 + elapsedOfDay) /
			(22 * SECONDS_IN_TRADING_DAY)
		);
	if (interval === "week")
		return (date.getDay() - 1 + elapsedOfDay) / (5 * SECONDS_IN_TRADING_DAY);
	if (interval === "day") return elapsedOfDay / SECONDS_IN_TRADING_DAY;
	if (interval === "minute")
		return (elapsedOfDay % (60 * period)) / SECONDS_IN_TRADING_DAY;
	if (interval === "second")
		return (elapsedOfDay % period) / SECONDS_IN_TRADING_DAY;
	return 0;
};
const logTables = (newQuote) => {
	const volByStrike = {};
	const chainTable = {};
	for (let i in newQuote.optionChain) {
		const option = newQuote.optionChain[i];
		const key = option.callorput.value + option.strike.value;
		if (!volByStrike[option.strike.value])
			volByStrike[option.strike.value] = { callvolume: 0, putvolume: 0 };
		volByStrike[option.strike.value][
			option.callorput.value == "C" ? "callvolume" : "putvolume"
		] += option.volume.value;
		let strExp = i.replace(/(.*[0-9]{8})[C|P](.*)/, "$1$2");
		if (!chainTable[strExp])
			chainTable[strExp] = {
				calldelta: 0,
				calltheta: 0,
				callvega: 0,
				callimpliedvolatility: 0,
				callopeninterest: 0,
				callvolume: 0,
				callprice: 0,
				strike: option.strike.value,
				expiration: option.expiration.value,
				putprice: 0,
				putvolume: 0,
				putopeninterest: 0,
				putimpliedvolatility: 0,
				putvega: 0,
				puttheta: 0,
				putdelta: 0
			};
		if (option.callorput.value == "C") {
			chainTable[strExp].callimpliedvolatility +=
				option.impliedvolatility.value;
			chainTable[strExp].callopeninterest += option.openinterest.value;
			chainTable[strExp].callvolume += option.volume.value;
			chainTable[strExp].callprice += option.price.value;
			chainTable[strExp].calldelta += option.delta.value;
			chainTable[strExp].calltheta += option.theta.value;
			chainTable[strExp].callvega += option.vega.value;
		} else {
			chainTable[strExp].putimpliedvolatility += option.impliedvolatility.value;
			chainTable[strExp].putopeninterest += option.openinterest.value;
			chainTable[strExp].putvolume += option.volume.value;
			chainTable[strExp].putprice += option.price.value;
			chainTable[strExp].putdelta += option.delta.value;
			chainTable[strExp].puttheta += option.theta.value;
			chainTable[strExp].putvega += option.vega.value;
		}
	}
	console.table(volByStrike);
	console.table(chainTable);
};
const isDaily = ({ interval }) =>
	interval === "day" || interval === "week" || interval === "month";
/*** End simulator functions.  Below code supplements regular quote feed with option chain ***/
const optionChainSimulator = {};
Object.assign(optionChainSimulator, quoteFeedSimulator);
optionChainSimulator.fetchInitialData = function (
	symbol,
	suggestedStartDate,
	suggestedEndDate,
	params,
	cb
) {
	function callback(obj) {
		if (obj.error) return cb(obj);
		const daily = isDaily(params);
		let quotesToPopulate = [];
		for (
			let i = 0;
			i < obj.quotes.length && quotesToPopulate.length < HIST_DEPTH;
			i++
		) {
			const recentQuote = obj.quotes[obj.quotes.length - i - 1];
			if (daily || !isMarketClosed(recentQuote.DT))
				quotesToPopulate.push(recentQuote);
		}
		while (quotesToPopulate.length) {
			const quote = quotesToPopulate.pop();
			const factor = getFractionOfInterval(
				params,
				null,
				quotesToPopulate.length > 0 ||
					quote.DT.getUTCDate() !== new Date().getUTCDate()
			);
			if (factor) {
				populateExpirations(quote.DT, quote.Close, symbol);
				quote.optionChain = randomChain(quote, symbol, factor);
				if (DEBUG && !quotesToPopulate.length) logTables(quote);
			}
		}
		cb(obj);
	}
	quoteFeedSimulator.fetchInitialData(
		symbol,
		suggestedStartDate,
		suggestedEndDate,
		params,
		callback
	);
};
optionChainSimulator.fetchUpdateData = function (
	symbol,
	startDate,
	params,
	cb
) {
	function callback(obj) {
		if (obj.error || !obj.quotes || obj.quotes.length === 0) return cb(obj);
		obj.quotes[0].optionChain = formatResponse(cachedData[symbol]);
		const newestQuote = obj.quotes[obj.quotes.length - 1];
		let updateChain = false;
		if (isMarketClosed(newestQuote.DT)) {
			// prevent intraday after hours data
			// and freeze daily post-market data until next day data appears
			if (isDaily(params)) {
				if (
					isBeforeOpen() &&
					newestQuote.DT.getUTCDate() === new Date().getUTCDate()
				) {
					cachedData[symbol] = { underlying: symbol };
					delete newestQuote.optionChain;
				} else if (isMarketClosed()) {
					newestQuote.optionChain = formatResponse(cachedData[symbol]);
				} else {
					updateChain = true;
				}
			}
		} else {
			updateChain = true;
		}
		if (updateChain) {
			if (
				!newestQuote.optionChain ||
				!Object.keys(newestQuote.optionChain).length
			) {
				populateExpirations(newestQuote.DT, newestQuote.Close, symbol);
				newestQuote.optionChain = randomChain(newestQuote, symbol);
			} else if (getFractionOfInterval(params)) {
				newestQuote.optionChain = randomUpdate(symbol, newestQuote.Close);
			}
		}
		cb(obj);
	}
	quoteFeedSimulator.fetchUpdateData(symbol, startDate, params, callback);
};
export default optionChainSimulator;
