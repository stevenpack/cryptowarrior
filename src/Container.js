"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSub = require("pubsub-js");
const GdaxApi_1 = require("./sources/gdax/GdaxApi");
const GdaxPriceHistorySource_1 = require("./sources/gdax/GdaxPriceHistorySource");
const GdaxTickerSource_1 = require("./sources/gdax/GdaxTickerSource");
const MockSources_1 = require("./sources/mock/MockSources");
const GdaxLivePriceSource_1 = require("./sources/gdax/GdaxLivePriceSource");
/**
 * IoC Container
 *
 * Note: Would love to use the Angular style one where $args are auto-injected. Don't love the existing
 *       solutions on npm
 */
class Container {
    constructor() {
        this.eventHub = PubSub;
        this.gdaxApi = new GdaxApi_1.GdaxApi(this.eventHub);
        this.gdaxPriceHistoryAdapter = new GdaxPriceHistorySource_1.GdaxPriceHistoryAdapter();
        //this.initMock();
        this.initGdax();
    }
    initGdax() {
        this.priceHistorySource = new GdaxPriceHistorySource_1.GdaxPriceHistorySource(this.gdaxApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = new GdaxLivePriceSource_1.GdaxLivePriceSource(this.gdaxApi);
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