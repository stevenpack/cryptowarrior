"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const moment = require("moment");
const Events_1 = require("../events/Events");
const contrib = require("blessed-contrib");
class PriceHistoryComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
        this.headers = ["Time", "Low", "High", "Open", "Close"];
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.table, {
            keys: true,
            fg: "green",
            label: "Price History",
            columnSpacing: 1,
            columnWidth: [18, 10, 10, 10, 10],
        });
    }
    setWidget(widget) {
        this.table = widget;
    }
    configure(widget, opts) {
        widget.setData({ headers: this.headers, data: [] });
        this.eventHub.subscribe(Events_1.Events.TickerChanged, (msg, data) => this.onTickerChanged(msg, data));
    }
    async load(opts) {
    }
    onTickerChanged(msg, data) {
        const ticker = data;
        this.reload(ticker);
    }
    async reload(ticker) {
        this.table.setData({ headers: this.headers, data: [] });
        this.fireUpdated();
        const priceHistoryData = await this.source.getData(ticker.id);
        // The table takes data as an array per row
        const tableData = [];
        for (const candle of priceHistoryData.Items) {
            // TODO: configurable approach to format with defaults
            const timeFmt = moment(candle.Time * 1000).format("DD-MMM-YY HH:mm");
            const formatPrice = (price) => price.toFixed(2);
            tableData.push([
                timeFmt,
                formatPrice(candle.Low),
                formatPrice(candle.High),
                formatPrice(candle.Open),
                formatPrice(candle.Close),
            ]);
        }
        this.table.setData({ headers: this.headers, data: tableData });
        this.fireUpdated();
    }
}
exports.PriceHistoryComponent = PriceHistoryComponent;
//# sourceMappingURL=PriceHistoryComponent.js.map