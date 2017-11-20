"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const events_1 = require("../events/events");
const Component_1 = require("./Component");
class TickerListComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
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
        const ticker = this.tickers[index];
        this.eventHub.publish(events_1.Events.TickerChanged, ticker);
        this.eventHub.publish(events_1.Events.LogEvent, "New ticker: " + ticker.id);
        this.list.hide();
    }
    async load(opts) {
        this.tickers = await this.source.getData(null);
        for (const t of this.tickers) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(t.id);
        }
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.TickerListComponent = TickerListComponent;
//# sourceMappingURL=TickerListComponent.js.map