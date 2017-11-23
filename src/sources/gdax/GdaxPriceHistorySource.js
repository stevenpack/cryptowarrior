"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceHistory_1 = require("../../types/PriceHistory");
const Javascript_1 = require("../../util/Javascript");
const Logger_1 = require("../../Logger");
const logger = Logger_1.Log.getLogger("GdaxPriceHistoryAdapter");
/**
 * Converts from Gdax rows to `Candle` type
 */
class GdaxPriceHistoryAdapter {
    convert(data) {
        try {
            const candles = [];
            if (Javascript_1.Javascript.isIterable(data)) {
                for (const item of data) {
                    try {
                        const candle = this.map(item);
                        candles.push(candle);
                    }
                    catch (e) {
                        logger.error(`Ignored bad candle. ${e} ${item}`);
                    }
                }
            }
            return new PriceHistory_1.PriceHistory(candles);
        }
        catch (e) {
            logger.error(`Failed to convert GDAX data to PriceHistory. Error: ${e}`);
        }
    }
    map(item) {
        const time = parseInt(item[0], 10);
        const low = parseFloat(item[1]);
        const high = parseFloat(item[2]);
        const open = parseFloat(item[3]);
        const close = parseFloat(item[4]);
        const volume = parseFloat(item[5]);
        return new PriceHistory_1.Candle(time, low, high, open, close, volume);
    }
}
exports.GdaxPriceHistoryAdapter = GdaxPriceHistoryAdapter;
/**
 * Source of `PriceHistory` data, combining the GDaxApi and Adapter
 */
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