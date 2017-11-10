"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const GdaxApi_1 = require("../sources/GdaxApi");
const PriceHistorySource_1 = require("../sources/PriceHistorySource");
const contrib = require('blessed-contrib');
class PriceHistoryComponent {
    constructor() {
        this.headers = ['Time', 'Low', 'High', 'Open', 'Close'];
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.table, {
            keys: true,
            fg: 'green',
            label: 'Price History',
            columnSpacing: 1,
            columnWidth: [12, 10, 10, 10, 10]
        });
    }
    setWidget(widget) {
        this.table = widget;
    }
    configure(widget, opts) {
        widget.setData({ headers: this.headers, data: [] });
    }
    async load(opts) {
        //TODO: IoC container
        let rawSource = new GdaxApi_1.GdaxApi();
        let adapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        let priceHistorySource = new PriceHistorySource_1.PriceHistorySource(rawSource, adapter);
        let priceHistoryData = await priceHistorySource.getData();
        //The table takes data as an array per row
        let table_data = [];
        for (let candle of priceHistoryData.Items) {
            table_data.push([candle.Time, candle.Low, candle.High, candle.Open, candle.Close]);
        }
        console.log("loaded");
        this.table.setData({ headers: this.headers, data: table_data });
    }
}
exports.PriceHistoryComponent = PriceHistoryComponent;
//# sourceMappingURL=PriceHistoryComponent.js.map