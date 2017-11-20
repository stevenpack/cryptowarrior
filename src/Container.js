"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSub = require("pubsub-js");
const GdaxApi_1 = require("./sources/gdax/GdaxApi");
const GdaxPriceHistorySource_1 = require("./sources/gdax/GdaxPriceHistorySource");
const GdaxTickerSource_1 = require("./sources/gdax/GdaxTickerSource");
const MockSources_1 = require("./sources/mock/MockSources");
const GdaxLivePriceSource_1 = require("./sources/gdax/GdaxLivePriceSource");
const ScreenInventory_1 = require("./layouts/ScreenInventory");
/**
 * IoC Container
 *
 * Note: Would love to use the Angular style one where $args are auto-injected. Don't love the existing
 *       solutions on npm
 */
class Factory {
    constructor(func) {
        this.func = func;
    }
    create(opts) {
        return this.func(opts);
    }
}
exports.Factory = Factory;
class Container {
    constructor(argv) {
        this.argv = argv;
        this.eventHub = PubSub;
        this.tickers = ["BTC-USD", "ETH-USD", "LTC-USD"];
        this.gdaxApi = new GdaxApi_1.GdaxApi(this.eventHub);
        this.gdaxPriceHistoryAdapter = new GdaxPriceHistorySource_1.GdaxPriceHistoryAdapter();
        this.screenInventory = new ScreenInventory_1.ScreenInventory();
        switch (argv.source) {
            case "mock":
                this.initMock();
                this.source = "Mock";
                break;
            default:
                this.initGdax();
                this.source = "GDAX";
                break;
        }
    }
    initGdax() {
        this.priceHistorySource = new GdaxPriceHistorySource_1.GdaxPriceHistorySource(this.gdaxApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = new GdaxLivePriceSource_1.GdaxLivePriceSource(this.tickers, this.gdaxApi);
        this.tickerSource = new GdaxTickerSource_1.GdaxTickerSource(this.gdaxApi);
    }
    initMock() {
        this.priceHistorySource = new MockSources_1.MockPriceHistorySource();
        this.livePriceSource = new MockSources_1.MockLivePriceSource();
        this.tickerSource = new MockSources_1.MockTickerSource();
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map