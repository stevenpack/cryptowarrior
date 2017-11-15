import { IComponent, WidgetOpts, ComponentBase } from "./Component";
import moment = require("moment");
import {Events} from "../events/Events";
import {ISource} from "../sources/Interfaces";
import {PriceHistory} from "../types/PriceHistory";
import {Ticker} from "../types/Ticker";

const contrib = require("blessed-contrib");

export class PriceHistoryLineChartComponent extends ComponentBase implements IComponent {
    public lineChart: any;

    constructor(eventHub, private source: ISource<PriceHistory>) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.line, {
            label: "Line chart"
        });
    }

    public setWidget(widget: any) {
        this.lineChart = widget;
    }

    public configure(widget: any, opts?: any) {
        this.eventHub.subscribe(Events.TickerChanged, (msg, data) => this.onTickerChanged(msg, data));
    }

    public async load(opts?: any) {
    }

    private onTickerChanged(msg, data) {
        const ticker = data as Ticker;
        this.reload(ticker);
    }

    private async reload(ticker) {
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
        this.lineChart.options.label = ticker.id;
        this.lineChart.options.minY = Math.min.apply(this, y);
        this.lineChart.setData({title, x, y});
        this.fireUpdated();
    }
}
