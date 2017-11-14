"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSub = require("pubsub-js");
const GdaxApi_1 = require("./sources/GdaxApi");
const PriceHistorySource_1 = require("./sources/PriceHistorySource");
const RawTestApi_1 = require("./sources/RawTestApi");
class Container {
    constructor() {
        this.eventHub = PubSub;
        this.gdaxApi = new GdaxApi_1.GdaxApi(this.eventHub);
        const testApi = new RawTestApi_1.RawTestApi();
        this.gdaxPriceHistoryAdapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource_1.PriceHistorySource(testApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = new RawTestApi_1.RawTestApi();
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map