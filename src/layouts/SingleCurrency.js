"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const LayoutBase_1 = require("./LayoutBase");
const Events_1 = require("../events/Events");
const Ticker_1 = require("../types/Ticker");
const PriceHistoryLineChartComponent_1 = require("../components/PriceHistoryLineChartComponent");
const BigLabelComponent_1 = require("../components/BigLabelComponent");
const KeyBinding_1 = require("./KeyBinding");
const StandardLayout_1 = require("./StandardLayout");
const Logger_1 = require("../Logger");
const logger = Logger_1.Log.getLogger("SingleCurrency");
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends StandardLayout_1.StandardLayout {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.tickerList = container.componentFactory.createList("ticker", container);
        this.periodList = container.componentFactory.createList("period", container);
        this.bigLabelComponent = new BigLabelComponent_1.BigLabelComponent(this.eventHub, "BTC-USD");
        this.priceHistoryComponent = new PriceHistoryComponent_1.PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource, false);
        this.priceHistoryLineChartComponent = new PriceHistoryLineChartComponent_1.PriceHistoryLineChartComponent(this.eventHub, this.container.priceHistorySource);
    }
    getElements() {
        return super.getElements().concat([
            new LayoutBase_1.Element(this.tickerList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.periodList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.bigLabelComponent, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(2, 6)),
            new LayoutBase_1.Element(this.livePriceComponent, new LayoutBase_1.Location(0, 6), new LayoutBase_1.Size(2, 6)),
            new LayoutBase_1.Element(this.priceHistoryComponent, new LayoutBase_1.Location(2, 6), new LayoutBase_1.Size(10, 6)),
            new LayoutBase_1.Element(this.priceHistoryLineChartComponent, new LayoutBase_1.Location(2, 0), new LayoutBase_1.Size(10, 6)),
        ]);
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["t"], "[T]icker List"), (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["p"], "[P]eriod List"), (ch, key) => this.periodList.toggleVisibility());
    }
    postLoad() {
        this.eventHub.publish(Events_1.Events.TickerChanged, new Ticker_1.Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map