"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gdax_1 = require("gdax");
const Logger_1 = require("../../Logger");
const logger = Logger_1.Log.getLogger("GdaxApi");
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