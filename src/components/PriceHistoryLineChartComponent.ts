
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
        return new WidgetOpts(contrib.line, {});
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
        this.lineChart.setData({title, x, y});
        this.fireUpdated();
    }
}
