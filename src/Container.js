"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSub = require("pubsub-js");
const GdaxApi_1 = require("./sources/GdaxApi");
const PriceHistorySource_1 = require("./sources/PriceHistorySource");
const MockSources_1 = require("./sources/MockSources");
const TickerSource_1 = require("./sources/TickerSource");
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
        this.gdaxPriceHistoryAdapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        this.initMock();
    }
    initGdax() {
        this.priceHistorySource = new PriceHistorySource_1.PriceHistorySource(this.gdaxApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = this.gdaxApi;
        this.tickerSource = new TickerSource_1.GdaxTickerSource(this.gdaxApi);
    }
    initMock() {
        this.priceHistorySource = new MockSources_1.MockPriceHistorySource();
        this.livePriceSource = new MockSources_1.MockLivePriceSource();
        this.tickerSource = new MockSources_1.MockTickerSource();
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map