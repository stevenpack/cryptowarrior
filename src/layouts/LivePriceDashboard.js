"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LoggerComponent_1 = require("../components/LoggerComponent");
const LayoutBase_1 = require("./LayoutBase");
const ScreenListComponent_1 = require("../components/ScreenListComponent");
/**
 * Layout optimized for viewing a single currency
 */
class LivePriceDashboard extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.livePriceComponent1 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource, true);
        this.livePriceComponent2 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "ETH-USD", this.container.livePriceSource, true);
        this.livePriceComponent3 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "LTC-USD", this.container.livePriceSource, true);
        this.screenList = new ScreenListComponent_1.ScreenListComponent(this.eventHub, container.screenInventory);
    }
    getElements() {
        return [
            // TODO: have component offer a preferred, overridable size and location
            new LayoutBase_1.Element(this.screenList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 6)),
            new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)),
            new LayoutBase_1.Element(this.livePriceComponent1, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.livePriceComponent2, new LayoutBase_1.Location(0, 4), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.livePriceComponent3, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)),
        ];
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
        this.attachKeyHandler(["s"], (ch, key) => this.screenList.toggleVisibility());
    }
    postLoad() {
    }
}
exports.LivePriceDashboard = LivePriceDashboard;
//# sourceMappingURL=LivePriceDashboard.js.map