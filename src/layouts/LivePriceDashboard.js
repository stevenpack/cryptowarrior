"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LoggerComponent_1 = require("../components/LoggerComponent");
const LayoutBase_1 = require("./LayoutBase");
const Events_1 = require("../events/Events");
const Ticker_1 = require("../types/Ticker");
/**
 * Layout optimized for viewing a single currency
 */
class LivePriceDashboard extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.livePriceComponent1 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource);
        this.livePriceComponent2 = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "ETH-USD", this.container.livePriceSource);
    }
    getElements() {
        return [
            new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)),
            new LayoutBase_1.Element(this.livePriceComponent1, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.livePriceComponent2, new LayoutBase_1.Location(3, 8), new LayoutBase_1.Size(2, 4)),
        ];
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
    }
    postLoad() {
        this.eventHub.publish(Events_1.Events.TickerChanged, new Ticker_1.Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
exports.LivePriceDashboard = LivePriceDashboard;
//# sourceMappingURL=LivePriceDashboard.js.map