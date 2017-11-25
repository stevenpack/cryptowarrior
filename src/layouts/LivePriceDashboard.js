"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LayoutBase_1 = require("./LayoutBase");
const StandardLayout_1 = require("./StandardLayout");
/**
 * Displays multiple live prices
 */
class LivePriceDashboard extends StandardLayout_1.StandardLayout {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.livePriceComponent1 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource, true);
        this.livePriceComponent2 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "ETH-USD", this.container.livePriceSource, true);
        this.livePriceComponent3 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "LTC-USD", this.container.livePriceSource, true);
    }
    getElements() {
        return super.getElements().concat([
            new LayoutBase_1.Element(this.livePriceComponent1, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.livePriceComponent2, new LayoutBase_1.Location(0, 4), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.livePriceComponent3, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)),
        ]);
    }
}
exports.LivePriceDashboard = LivePriceDashboard;
//# sourceMappingURL=LivePriceDashboard.js.map