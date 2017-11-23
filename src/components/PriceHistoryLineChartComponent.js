"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const moment = require("moment");
const Events_1 = require("../events/Events");
const Ticker_1 = require("../types/Ticker");
const Period_1 = require("../types/Period");
const Logger_1 = require("../Logger");
const contrib = require("blessed-contrib");
const logger = Logger_1.Log.getLogger("PriceHistoryLineChartComponent");
/**
 * Display price history data as a line graph
 */
class PriceHistoryLineChartComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
        this.state = {
            ticker: new Ticker_1.Ticker("BTC-USD"),
            period: Period_1.Period.Day,
        };
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.line, {});
    }
    setWidget(widget) {
        this.lineChart = widget;
    }
    configure(widget, opts) {
        this.subscribe(Events_1.Events.TickerChanged, this.onTickerChanged.bind(this));
        this.subscribe(Events_1.Events.PeriodChanged, this.onPeriodChanged.bind(this));
    }
    async load(opts) {
    }
    onTickerChanged(msg, data) {
        this.state.ticker = data;
        this.reload();
    }
    onPeriodChanged(msg, data) {
        logger.info("onPeriodChanged");
        this.state.period = data;
        this.reload();
    }
    async reload() {
        const priceHistoryData = await this.source.getData({
            tickerId: this.state.ticker.id,
            period: this.state.period,
        });
        // The table takes data as an array per row
        const title = this.state.ticker.id;
        const x = [];
        const y = [];
        for (const candle of priceHistoryData.Items.reverse()) {
            if (candle.Time && candle.Close) {
                const timeFmt = moment(candle.Time * 1000).format("DD-MMM-YY HH:mm");
                const formatPrice = (price) => price.toFixed(2);
                x.push(timeFmt);
                y.push(parseFloat(formatPrice(candle.Close)));
            }
        }
        this.lineChart.options.label = title;
        this.lineChart.options.minY = Math.min.apply(this, y);
        this.lineChart.setData({ title, x, y });
        this.fireUpdated();
    }
}
exports.PriceHistoryLineChartComponent = PriceHistoryLineChartComponent;
//# sourceMappingURL=PriceHistoryLineChartComponent.js.map