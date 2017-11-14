"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const events_1 = require("../events/events");
const GdaxApi_1 = require("../sources/GdaxApi");
const Component_1 = require("./Component");
class TickerListComponent extends Component_1.ComponentBase {
    constructor(eventHub) {
        super(eventHub);
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Ticker",
            selectedBg: "green",
            focusable: true,
            hidden: true,
            keys: true,
            mouse: true,
            vi: true,
        });
    }
    setWidget(widget) {
        this.list = widget;
    }
    configure(widget, opts) {
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }
    onSelected(item, index) {
        const ticker = this.products[index];
        // TODO: Redefine GDax types... prefer to be platform agnostic
        // TODO: This will go to screen, need flag for whether it should rebroadcast to children
        this.eventHub.publish(events_1.Events.TickerChanged, ticker);
        this.eventHub.publish(events_1.Events.LogEvent, "New ticker: " + ticker.id);
        this.list.hide();
    }
    async load(opts) {
        const rawSource = new GdaxApi_1.GdaxApi();
        this.products = await rawSource.getProducts();
        for (const p of this.products) {
            //Works (index.d.ts is wrong)
            this.list.pushItem(p.id);
        }
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.TickerListComponent = TickerListComponent;
//# sourceMappingURL=TickerList.js.map