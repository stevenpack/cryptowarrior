"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePrice_1 = require("../../types/LivePrice");
class GdaxLivePriceSource {
    constructor(api) {
        this.api = api;
    }
    subscribe(opts, callback) {
        const productIds = opts;
        this.api.subscribe(productIds, (data) => this.onMessage(callback, data));
    }
    onMessage(callback, data) {
        switch (data.type) {
            case "open":
                const livePrice = new LivePrice_1.LivePrice(data.id, data.price);
                callback(livePrice);
                break;
        }
    }
}
exports.GdaxLivePriceSource = GdaxLivePriceSource;
//# sourceMappingURL=GdaxLivePricesource.js.map