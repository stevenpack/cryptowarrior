"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const contrib = require('blessed-contrib');
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency {
    constructor() {
        this.screen = blessed.screen({});
        this.components = [];
        this.locations = [];
        //create layout and widgets
        //upgrade_todo: ScreenBuilder with components and sources
        let grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });
        this.components.push(new PriceHistoryComponent_1.PriceHistoryComponent());
        this.locations.push([1, 1, 8, 4]);
        this.components.push(new LivePriceComponent_1.LivePriceComponent());
        this.locations.push([1, 6, 2, 4]);
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            let loc = this.locations[i];
            //Create
            let widgetOpts = component.getWidgetOpts();
            //TODO: store position with the component
            let widget = grid.set(loc[0], loc[1], loc[2], loc[3], widgetOpts.widgetType, widgetOpts.opts);
            //Store reference
            component.setWidget(widget);
            //Configure
            component.configure(widget);
        }
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });
        this.screen.render();
    }
    async load() {
        for (let component of this.components) {
            await component.load();
        }
        this.screen.render();
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map