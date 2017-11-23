"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gdax_1 = require("gdax");
const Logger_1 = require("../../Logger");
const logger = Logger_1.Log.getLogger("GdaxApi");
/**
 * Wrapper for the GDAX REST API use gdax-node project. Streaming is handled by `GdaxLivePriceSource`
 *
 * note: Could migrate most api methods to gdax-tt snapshots, although price history isn't currently available
 */
class GdaxApi {
    constructor() {
        this.httpClient = new gdax_1.PublicClient();
    }
    async getPriceHistory(opts) {
        const priceHistoryHttpClient = new gdax_1.PublicClient(opts.tickerId);
        return priceHistoryHttpClient.getProductHistoricRates({ granularity: opts.period });
    }
    async getProducts() {
        return this.httpClient.getProducts();
    }
}
exports.GdaxApi = GdaxApi;
//# sourceMappingURL=GdaxApi.js.map