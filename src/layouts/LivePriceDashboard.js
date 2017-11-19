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
class SingleCurrency extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
    }
    getElements() {
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.livePriceComponent = new LivePriceComponent_1.LivePriceComponent(this.eventHub, this.container.livePriceSource);
        const elements = [];
        elements.push(new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)));
        //elements.push(new Element(this.tickerList, new Location(0, 0), new Size(12, 2)));
        elements.push(new LayoutBase_1.Element(this.livePriceComponent, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)));
        return elements;
    }
    bindKeys() {
        super.bindKeys();
        // this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
    }
    postLoad() {
        this.eventHub.publish(Events_1.Events.TickerChanged, new Ticker_1.Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=LivePriceDashboard.js.map