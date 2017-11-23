import { IComponent, WidgetOpts, ComponentBase } from "./Component";
import moment = require("moment");
import {Events} from "../events/Events";
import {ISource} from "../sources/Interfaces";
import {PriceHistory} from "../types/PriceHistory";
import {Ticker} from "../types/Ticker";
import {Period} from "../types/Period";
const contrib = require("blessed-contrib");

/**
 * Price History in High,Low,Open,Close format
 */
export class PriceHistoryComponent extends ComponentBase implements IComponent {
    public headers: string[];
    public table: any;

    private state: {
        ticker: Ticker;
        period: Period;
    };

    constructor(eventHub, private source: ISource<PriceHistory>) {
        super(eventHub);
        this.headers = ["Time", "Low", "High", "Open", "Close"];
        this.state = {
            ticker: new Ticker("BTC-USD"),
            period: Period.Day,
        };
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.table,
            {
                keys: true,
                label: "Price History",
                columnSpacing: 1,
                columnWidth: [18, 10, 10, 10, 10],
            });
    }

    public setWidget(widget: any) {
        this.table = widget;
    }

    public configure(widget: any, opts?: any) {
        widget.setData({headers: this.headers, data: []});
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
        this.state.period = data;
        this.reload();
    }

    private async reload() {
        // Blank the table while we load
        this.table.setData({headers: this.headers, data: []});
        this.fireUpdated();

        const priceHistoryData = await this.source.getData({
            tickerId: this.state.ticker.id,
            period: this.state.period,
        });

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
        this.table.setData({headers: this.headers, data: tableData});
        this.fireUpdated();
    }
}
