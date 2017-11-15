"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var errorsLine = grid.set(0, 6, 4, 3, contrib.line,
//     { style:
//         { line: "red"
//             , text: "white"
//             , baseline: "black"}
//         , label: 'Errors Rate'
//         , maxY: 60
//         , showLegend: true })
// var errorsData = {
//     title: 'server 1',
//     x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25'],
//     y: [30, 50, 70, 40, 50, 20]
// }
//
// setLineData([errorsData], errorsLine)
const Component_1 = require("./Component");
const moment = require("moment");
const Events_1 = require("../events/Events");
const contrib = require("blessed-contrib");
class PriceHistoryLineChartComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.line, {});
    }
    setWidget(widget) {
        this.lineChart = widget;
    }
    configure(widget, opts) {
        this.eventHub.subscribe(Events_1.Events.TickerChanged, (msg, data) => this.onTickerChanged(msg, data));
    }
    async load(opts) {
    }
    onTickerChanged(msg, data) {
        const ticker = data;
        this.reload(ticker);
    }
    async reload(ticker) {
        const priceHistoryData = await this.source.getData(ticker.id);
        // The table takes data as an array per row
        const title = ticker.id;
        const x = [];
        const y = [];
        for (const candle of priceHistoryData.Items) {
            if (candle.Time && candle.Close) {
                // TODO: configurable approach to format with defaults
                const timeFmt = moment(candle.Time * 1000).format("DD-MMM-YY HH:mm");
                const formatPrice = (price) => price.toFixed(2);
                x.push(timeFmt);
                y.push(parseFloat(formatPrice(candle.Close)));
            }
        }
        this.lineChart.setData({ title, x, y });
        this.fireUpdated();
    }
}
exports.PriceHistoryLineChartComponent = PriceHistoryLineChartComponent;
//# sourceMappingURL=PriceHistoryLineChartComponent.js.map