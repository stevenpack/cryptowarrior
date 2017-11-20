"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LoggerComponent_1 = require("../components/LoggerComponent");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const TickerList_1 = require("../components/TickerList");
const LayoutBase_1 = require("./LayoutBase");
const Events_1 = require("../events/Events");
const Ticker_1 = require("../types/Ticker");
const PriceHistoryLineChartComponent_1 = require("../components/PriceHistoryLineChartComponent");
const PeriodListComponent_1 = require("../components/PeriodListComponent");
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.tickerList = new TickerList_1.TickerListComponent(this.eventHub, this.container.tickerSource);
        this.periodList = new PeriodListComponent_1.PeriodListComponent(this.eventHub);
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.priceHistoryComponent = new PriceHistoryComponent_1.PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource);
        this.priceHistoryLineChartComponent = new PriceHistoryLineChartComponent_1.PriceHistoryLineChartComponent(this.eventHub, this.container.priceHistorySource);
    }
    getElements() {
        return [
            new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)),
            new LayoutBase_1.Element(this.tickerList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.periodList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.priceHistoryComponent, new LayoutBase_1.Location(2, 7), new LayoutBase_1.Size(10, 5)),
            new LayoutBase_1.Element(this.livePriceComponent, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)),
            new LayoutBase_1.Element(this.priceHistoryLineChartComponent, new LayoutBase_1.Location(2, 0), new LayoutBase_1.Size(10, 7)),
        ];
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(["t"], (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(["p"], (ch, key) => this.periodList.toggleVisibility());
        this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
    }
    postLoad() {
        this.eventHub.publish(Events_1.Events.TickerChanged, new Ticker_1.Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map