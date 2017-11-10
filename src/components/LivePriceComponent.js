"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const GdaxApi_1 = require("../sources/GdaxApi");
const PriceHistorySource_1 = require("../sources/PriceHistorySource");
const contrib = require('blessed-contrib');
class LivePriceComponent {
    constructor() {
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.lcd, {
            label: "BTC-USD",
            //segmentWidth: 0.05,
            //segmentInterval: 0.11,
            strokeWidth: 1,
            elements: 4,
            display: "0000",
        });
    }
    setWidget(widget) {
        this.lcd = widget;
    }
    configure(widget, opts) {
    }
    async load(opts) {
        //TODO: IoC container
        let rawSource = new GdaxApi_1.GdaxApi();
        let adapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        let priceHistorySource = new PriceHistorySource_1.PriceHistorySource(rawSource, adapter);
        let priceHistoryData = await priceHistorySource.getData();
        this.lcd.setDisplay(priceHistoryData.Items[0].Close);
        this.lcd.setOptions({
            color: 'green',
        });
    }
}
exports.LivePriceComponent = LivePriceComponent;
//# sourceMappingURL=LivePriceComponent.js.map