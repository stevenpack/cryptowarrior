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
            [1510269060, 7120, 7120.01, 7120.01, 7120, 4.042463090000001],
            [1510269060, 7130, 7130.01, 7130.01, 7130, 4.042463090000001],
            [1510269060, 7410, 7410.01, 7410.01, 7410, 4.042463090000001],
            [1510269060, 7510, 7510.01, 7510.01, 7510, 4.042463090000001],
        ];
        const adapter = new GdaxPriceHistorySource_1.GdaxPriceHistoryAdapter();
        const priceHistory = adapter.convert(raw);
        return Promise.resolve(priceHistory);
    }
}
exports.MockPriceHistorySource = MockPriceHistorySource;
class MockLivePriceSource {
    constructor() {
        this.stopped = false;
    }
    subscribe(opts, callback) {
        this.stopped = false;
        this.delayAndPublish(callback, 6500, 300, 50);
        return Promise.resolve(1);
    }
    unsubscribe(subscriptionId) {
        this.stopped = true;
    }
    delayAndPublish(callback, btcPrice, ethPrice, ltcPrice) {
        setTimeout(() => {
            if (this.stopped) {
                return;
            }
            callback(new LivePrice_1.LivePrice("BTC-USD", btcPrice));
            callback(new LivePrice_1.LivePrice("ETH-USD", ethPrice));
            callback(new LivePrice_1.LivePrice("LTC-USD", ltcPrice));
            this.delayAndPublish(callback, btcPrice + .1, ethPrice + .1, ltcPrice + .01);
        }, 100);
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