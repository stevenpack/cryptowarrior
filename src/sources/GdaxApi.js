"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
class GdaxApi {
    constructor() {
    }
    async getData() {
        return this.getPriceHistory();
    }
    async getPriceHistory() {
        return rp('https://api.gdax.com/products/BTC-USD/candles', {
            headers: {
                'User-Agent': 'packfinance'
            }
        });
    }
}
exports.GdaxApi = GdaxApi;
//# sourceMappingURL=GdaxApi.js.map