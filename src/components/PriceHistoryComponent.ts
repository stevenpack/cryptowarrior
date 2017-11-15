import { IComponent, WidgetOpts, ComponentBase } from "./Component";
import moment = require("moment");
import {Events} from "../events/Events";
import {ISource} from "../sources/Interfaces";
import {PriceHistory} from "../types/PriceHistory";
import {Ticker} from "../types/Ticker";

const contrib = require("blessed-contrib");

export class PriceHistoryComponent extends ComponentBase implements IComponent {

    public headers: string[];
    public table: any;

    constructor(eventHub, private source: ISource<PriceHistory>) {
        super(eventHub);
        this.headers = ["Time", "Low", "High", "Open", "Close"];
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.table,
            {
                keys: true,
                fg: "green",
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
        this.eventHub.subscribe(Events.TickerChanged, (msg, data) => this.onTickerChanged(msg, data));
    }

    public async load(opts?: any) {
    }

    private onTickerChanged(msg, data) {
        const ticker = data as Ticker;
        this.reload(ticker);
    }

    private async reload(ticker) {
        this.table.setData({headers: this.headers, data: []});
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
        this.table.setData({headers: this.headers, data: tableData});
        this.fireUpdated();
    }
}
