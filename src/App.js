"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxApi_1 = require("./sources/GdaxApi");
const PriceHistorySource_1 = require("./sources/PriceHistorySource");
const SingleCurrency_1 = require("./layouts/SingleCurrency");
let contrib = require('blessed-contrib');
class App {
    constructor() {
        let rawSource = new GdaxApi_1.GdaxApi();
        let adapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource_1.PriceHistorySource(rawSource, adapter);
    }
    async get() {
        let prices = await this.priceHistorySource.getData();
        //console.log(JSON.stringify(prices, null, 2));
        return prices;
    }
    loadUI() {
        this.screen = new SingleCurrency_1.SingleCurrency();
    }
    loadData(data) {
        this.screen.load(data);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map