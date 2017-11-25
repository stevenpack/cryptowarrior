"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListComponent_1 = require("./ListComponent");
const Events_1 = require("../events/Events");
class ComponentFactory {
    constructor(eventHub) {
        this.eventHub = eventHub;
    }
    createList(type, container) {
        switch (type.toLowerCase()) {
            case "ticker":
                return this.createListComponent("Ticker", container.tickerSource, Events_1.Events.TickerChanged, (ticker) => ticker.id);
            case "period":
                return this.createListComponent("Period", container.periodSource, Events_1.Events.PeriodChanged, (period) => period);
            case "screen":
                return this.createListComponent("Screen", container.screenInventory, Events_1.Events.ScreenChanged, (layoutDetails) => `${layoutDetails.index + 1}. ${layoutDetails.name}`);
            default:
                throw new Error(`Unknown list component ${type}`);
        }
    }
    createListComponent(label, source, event, fnDisplay) {
        return new ListComponent_1.ListComponent(this.eventHub, label, source, event, fnDisplay);
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=ComponentFactory.js.map