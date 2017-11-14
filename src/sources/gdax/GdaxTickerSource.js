"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ticker_1 = require("../../types/Ticker");
class GdaxTickerSource {
    constructor(api) {
        this.api = api;
    }
    async getData(opts) {
        const data = await this.api.getProducts();
        return data.map(p => new Ticker_1.Ticker(p.id));
    }
}
exports.GdaxTickerSource = GdaxTickerSource;
//# sourceMappingURL=GdaxTickerSource.js.map