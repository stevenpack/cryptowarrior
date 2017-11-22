"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LoggerComponent_1 = require("../components/LoggerComponent");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const TickerListComponent_1 = require("../components/TickerListComponent");
const LayoutBase_1 = require("./LayoutBase");
const Events_1 = require("../events/Events");
const Ticker_1 = require("../types/Ticker");
const PriceHistoryLineChartComponent_1 = require("../components/PriceHistoryLineChartComponent");
const PeriodListComponent_1 = require("../components/PeriodListComponent");
const ScreenListComponent_1 = require("../components/ScreenListComponent");
const BigLabelComponent_1 = require("../components/BigLabelComponent");
const KeyBinding_1 = require("./KeyBinding");
const KeyHelpComponent_1 = require("../components/KeyHelpComponent");
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
        this.keyhelpComponent = new KeyHelpComponent_1.KeyHelpComponent(this.eventHub, this);
        this.tickerList = new TickerListComponent_1.TickerListComponent(this.eventHub, this.container.tickerSource);
        this.periodList = new PeriodListComponent_1.PeriodListComponent(this.eventHub);
        this.screenList = new ScreenListComponent_1.ScreenListComponent(this.eventHub, this.container.screenInventory);
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.bigLabelComponent = new BigLabelComponent_1.BigLabelComponent(this.eventHub, "BTC-USD");
        this.priceHistoryComponent = new PriceHistoryComponent_1.PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent_1.LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource, false);
        this.priceHistoryLineChartComponent = new PriceHistoryLineChartComponent_1.PriceHistoryLineChartComponent(this.eventHub, this.container.priceHistorySource);
    }
    getElements() {
        return [
            new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)),
            new LayoutBase_1.Element(this.keyhelpComponent, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.tickerList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.periodList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)),
            new LayoutBase_1.Element(this.screenList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 6)),
            new LayoutBase_1.Element(this.bigLabelComponent, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(2, 6)),
            new LayoutBase_1.Element(this.livePriceComponent, new LayoutBase_1.Location(0, 6), new LayoutBase_1.Size(2, 6)),
            new LayoutBase_1.Element(this.priceHistoryComponent, new LayoutBase_1.Location(2, 6), new LayoutBase_1.Size(10, 6)),
            new LayoutBase_1.Element(this.priceHistoryLineChartComponent, new LayoutBase_1.Location(2, 0), new LayoutBase_1.Size(10, 6)),
        ];
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["h"], "Show/Hide [H]elp"), (ch, key) => this.keyhelpComponent.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["t"], "Show/Hide [T]icker List"), (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["p"], "Show/Hide [P]eriod List"), (ch, key) => this.periodList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["l"], "Show/Hide [L]og Panel"), (ch, key) => this.log.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["s"], "Show/Hide [S]creen list"), (ch, key) => this.screenList.toggleVisibility());
    }
    postLoad() {
        this.eventHub.publish(Events_1.Events.TickerChanged, new Ticker_1.Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map