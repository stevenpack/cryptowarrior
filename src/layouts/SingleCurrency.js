"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const LayoutBase_1 = require("./LayoutBase");
const TickerList_1 = require("../components/TickerList");
const LoggerComponent_1 = require("../components/LoggerComponent");
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends LayoutBase_1.LayoutBase {
    constructor(eventHub) {
        super(12, 12, eventHub);
    }
    addElements() {
        this.tickerList = new TickerList_1.TickerListComponent(this.eventHub);
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
        this.elements.push(new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)));
        this.elements.push(new LayoutBase_1.Element(this.tickerList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 2)));
        this.elements.push(new LayoutBase_1.Element(new PriceHistoryComponent_1.PriceHistoryComponent(this.eventHub), new LayoutBase_1.Location(2, 8), new LayoutBase_1.Size(10, 4)));
        this.elements.push(new LayoutBase_1.Element(new LivePriceComponent_1.LivePriceComponent(), new LayoutBase_1.Location(0, 8), new LayoutBase_1.Size(2, 4)));
    }
    bindKeys() {
        super.bindKeys();
        this.screen.key(['t'], (ch, key) => {
            this.tickerList.toggleVisibility();
        });
        this.screen.key(['l'], (ch, key) => {
            this.log.toggleVisibility();
        });
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map