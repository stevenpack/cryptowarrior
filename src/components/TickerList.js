"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const GdaxApi_1 = require("../sources/GdaxApi");
const events_1 = require("events");
const blessed = require("blessed");
const events_2 = require("../events/events");
class TickerListComponent extends events_1.EventEmitter {
    constructor() {
        super();
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Ticker",
            selectedBg: 'green',
            focusable: true,
            hidden: true,
            keys: true,
            mouse: true,
            vi: true
        });
    }
    setWidget(widget) {
        this.list = widget;
    }
    configure(widget, opts) {
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }
    onSelected(item, index) {
        let ticker = this.products[index];
        //TODO: broadcast to the screen
        //TODO: Redefine GDax types... prefer to be platform agnostic
        //TODO: Enum for event
        //TODO: This will go to screen, need flag for whether it should rebroadcast to children
        this.emit(events_2.Events.TickerChanged, ticker);
        this.emit(events_2.Events.LogEvent, "New ticker: " + ticker.id);
    }
    async load(opts) {
        let rawSource = new GdaxApi_1.GdaxApi();
        this.products = await rawSource.getProducts();
        for (let p of this.products) {
            //Works (index.d.ts is wrong)
            this.list.pushItem(p.id);
        }
    }
    toggleVisibility() {
        if (this.list.hidden) {
            this.list.show();
            this.list.setFront();
        }
        else {
            this.list.hide();
        }
        this.list.focus();
        this.list.select(0);
        this.emit(events_2.Events.UIUpdate);
    }
}
exports.TickerListComponent = TickerListComponent;
//# sourceMappingURL=TickerList.js.map