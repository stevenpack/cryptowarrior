"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LoggerComponent_1 = require("../components/LoggerComponent");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const TickerList_1 = require("../components/TickerList");
const LayoutBase_1 = require("./LayoutBase");
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends LayoutBase_1.LayoutBase {
    constructor(eventHub, container) {
        super(12, 12, eventHub, container);
    }
    addElements() {
        this.tickerList = new TickerList_1.TickerListComponent(this.eventHub);
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.priceHistoryComponent = new PriceHistoryComponent_1.PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent_1.LivePriceComponent(this.eventHub, this.container.livePriceSource);
        this.elements.push(new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)));
        //this.elements.push(new Element(this.tickerList, new Location(0, 0), new Size(12, 2)));
        this.elements.push(new LayoutBase_1.Element(this.priceHistoryComponent, new LayoutBase_1.Location(2, 7), new LayoutBase_1.Size(10, 5)));
        this.elements.push(new LayoutBase_1.Element(this.livePriceComponent, new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)));
    }
    bindKeys() {
        super.bindKeys();
        this.screen.key(["t"], (ch, key) => {
            this.tickerList.toggleVisibility();
        });
        this.screen.key(["l"], (ch, key) => {
            this.log.toggleVisibility();
        });
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map