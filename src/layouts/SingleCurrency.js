"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const PriceHistoryComponent_1 = require("../components/PriceHistoryComponent");
const LivePriceComponent_1 = require("../components/LivePriceComponent");
const events_1 = require("events");
const contrib = require('blessed-contrib');
class LayoutBase {
    constructor(rows, cols) {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({ rows: rows, cols: cols, screen: this.screen });
        this.components = [];
        this.locations = [];
        //todo: check javascript spec re: calling abstract from constructor
        this.init();
    }
    init() {
        this.addComponents();
        this.build();
        this.listen();
        this.bindKeys();
    }
    build() {
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            let loc = this.locations[i];
            //Create
            let widgetOpts = component.getWidgetOpts();
            //TODO: store position with the component
            let widget = this.grid.set(loc[0], loc[1], loc[2], loc[3], widgetOpts.widgetType, widgetOpts.opts);
            //Store reference
            component.setWidget(widget);
            //Configure
            component.configure(widget);
        }
    }
    listen() {
        for (let component of this.components) {
            //TODO: throttle updates to once per interval e.g. 100ms
            if (component instanceof events_1.EventEmitter) {
                component.on("updated", () => this.screen.render());
            }
        }
    }
    bindKeys() {
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });
    }
    async load() {
        for (let component of this.components) {
            await component.load();
        }
        this.screen.render();
    }
}
exports.LayoutBase = LayoutBase;
/**
 * Layout optimized for viewing a single currency
 */
class SingleCurrency extends LayoutBase {
    constructor() {
        super(12, 12);
    }
    addComponents() {
        this.components.push(new PriceHistoryComponent_1.PriceHistoryComponent());
        this.locations.push([1, 1, 8, 4]);
        this.components.push(new LivePriceComponent_1.LivePriceComponent());
        this.locations.push([1, 6, 2, 4]);
    }
}
exports.SingleCurrency = SingleCurrency;
//# sourceMappingURL=SingleCurrency.js.map