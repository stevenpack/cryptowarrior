import { IComponent, WidgetOpts, ComponentBase } from "./Component";
import moment = require("moment");
import {Events} from "../events/Events";
import {ISource} from "../sources/Interfaces";
import {PriceHistory} from "../types/PriceHistory";
import {Ticker} from "../types/Ticker";
import {Period} from "../types/Period";
import {Log} from "../Logger";

const contrib = require("blessed-contrib");

const logger = Log.getLogger("PriceHistoryLineChartComponent");
export class PriceHistoryLineChartComponent extends ComponentBase implements IComponent {
    public lineChart: any;
    private state: {
        ticker: Ticker;
        period: Period;
    };
    constructor(eventHub, private source: ISource<PriceHistory>) {
        super(eventHub);
        this.state = {
            ticker: new Ticker("BTC-USD"),
            period: Period.Day,
        };
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.line, {

        });
    }

    public setWidget(widget: any) {
        this.lineChart = widget;
    }

    public configure(widget: any, opts?: any) {
        this.subscribe(Events.TickerChanged, this.onTickerChanged.bind(this));
        this.subscribe(Events.PeriodChanged, this.onPeriodChanged.bind(this));
    }

    public async load(opts?: any) {
    }

    private onTickerChanged(msg, data) {
        this.state.ticker = data as Ticker;
        this.reload();
    }

    private onPeriodChanged(msg, data) {
        logger.info("onPeriodChanged");
        this.state.period = data;
        this.reload();
    }

    private async reload() {
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
        this.lineChart.setData({title, x, y});
        this.fireUpdated();
    }
}
