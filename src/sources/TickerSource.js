"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ticker_1 = require("../types/Ticker");
class GdaxTickerSource {
    constructor(api, adapter) {
        this.api = api;
        this.adapter = adapter;
    }
    async getData(opts) {
        const data = await this.api.getProducts();
        return data.map(p => new Ticker_1.Ticker(p.id));
    }
}
exports.GdaxTickerSource = GdaxTickerSource;
//# sourceMappingURL=TickerSource.js.map