"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceHistory_1 = require("../types/PriceHistory");
class GdaxPriceHistoryAdapter {
    convert(data) {
        //console.log(data);
        let json = JSON.parse(data);
        let candles = new Array();
        for (let item of json) {
            try {
                //console.log("About to map: " + item);
                let candle = this.map(item);
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
    map(item) {
        let time = parseInt(item[0]);
        let low = parseFloat(item[1]);
        let high = parseFloat(item[2]);
        let open = parseFloat(item[3]);
        let close = parseFloat(item[4]);
        let volume = parseFloat(item[5]);
        return new PriceHistory_1.Candle(time, low, high, open, close, volume);
    }
}
exports.GdaxPriceHistoryAdapter = GdaxPriceHistoryAdapter;
class PriceHistorySource {
    constructor(rawSource, adapter) {
        this.rawSource = rawSource;
        this.adapter = adapter;
    }
    async getData() {
        let data = await this.rawSource.getData();
        let priceHistory = this.adapter.convert(data);
        return priceHistory;
    }
}
exports.PriceHistorySource = PriceHistorySource;
//# sourceMappingURL=PriceHistorySource.js.map