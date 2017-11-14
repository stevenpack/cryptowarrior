"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceHistory_1 = require("../../types/PriceHistory");
class GdaxPriceHistoryAdapter {
    convert(data) {
        try {
            const candles = [];
            for (const item of data) {
                try {
                    // console.log("About to map: " + item);
                    const candle = this.map(item);
                    candles.push(candle);
                }
                catch (e) {
                    console.error("Ignored bad candle.");
                    console.error(e);
                    console.error(item);
                }
            }
            return new PriceHistory_1.PriceHistory(candles);
        }
        catch (e) {
            console.error(e);
        }
    }
    map(item) {
        const time = parseInt(item[0]);
        const low = parseFloat(item[1]);
        const high = parseFloat(item[2]);
        const open = parseFloat(item[3]);
        const close = parseFloat(item[4]);
        const volume = parseFloat(item[5]);
        return new PriceHistory_1.Candle(time, low, high, open, close, volume);
    }
}
exports.GdaxPriceHistoryAdapter = GdaxPriceHistoryAdapter;
class GdaxPriceHistorySource {
    constructor(api, adapter) {
        this.api = api;
        this.adapter = adapter;
    }
    async getData(opts) {
        const data = await this.api.getPriceHistory(opts);
        const priceHistory = this.adapter.convert(data);
        return priceHistory;
    }
}
exports.GdaxPriceHistorySource = GdaxPriceHistorySource;
//# sourceMappingURL=GdaxPriceHistorySource.js.map