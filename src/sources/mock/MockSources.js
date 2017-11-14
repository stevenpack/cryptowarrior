"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxPriceHistorySource_1 = require("../gdax/GdaxPriceHistorySource");
const LivePrice_1 = require("../../types/LivePrice");
const Ticker_1 = require("../../types/Ticker");
class MockPriceHistorySource {
    getData(opts) {
        const raw = [
            [1510269120, 7110.01, 7110.02, 7110.01, 7110.02, 3.489994839999999],
            [1510269060, 7110, 7110.01, 7110.01, 7110, 4.042463090000001],
        ];
        const adapter = new GdaxPriceHistorySource_1.GdaxPriceHistoryAdapter();
        const priceHistory = adapter.convert(raw);
        return Promise.resolve(priceHistory);
    }
}
exports.MockPriceHistorySource = MockPriceHistorySource;
// todo: IStreamingSource<Price>
class MockLivePriceSource {
    subscribe(opts, callback) {
        this.delayAndPublish(callback, 6500);
    }
    delayAndPublish(callback, price) {
        setTimeout(() => {
            callback(new LivePrice_1.LivePrice("BTC-USD", price));
            this.delayAndPublish(callback, price + 1);
        }, 10);
    }
}
exports.MockLivePriceSource = MockLivePriceSource;
class MockTickerSource {
    getData(opts) {
        return Promise.resolve(["BTC-USD", "LTC-USD", "BTC-EUR", "LTC-EUR"].map((id) => new Ticker_1.Ticker(id)));
    }
}
exports.MockTickerSource = MockTickerSource;
//# sourceMappingURL=MockSources.js.map