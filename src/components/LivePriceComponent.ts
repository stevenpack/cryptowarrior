import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {Throttle} from "../events/Throttle";
import {IStreamingSource} from "../sources/Interfaces";
import {LivePrice} from "../types/LivePrice";
const contrib = require("blessed-contrib");

export class LivePriceComponent extends ComponentBase implements IComponent {
    public lcd: any;

    private throttle: Throttle;

    constructor(eventHub, private source: IStreamingSource<LivePrice>) {
        super(eventHub);
        this.throttle = new Throttle(200);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,
            {
                label: "BTC-USD",
                strokeWidth: 1,
                elements: 4,
                display: "0000",
            });
    }

    public setWidget(widget: any) {
        this.lcd = widget;
    }

    public configure(widget: any, opts?: any) {
        this.eventHub.subscribe(Events.TickerChanged, (msg, data) => this.onTickerChanged(msg, data));
    }

    public async load(opts?: any) {
    }

    public reload(ticker: string) {
        const callback = (data) => this.onPriceChanged(data);
        this.source.subscribe([ticker], callback);
    }

    public onPriceChanged(livePrice: LivePrice) {
        if (!this.throttle.tryRemoveToken()) {
            return;
        }
        this.lcd.setDisplay(livePrice.price);
        // todo: too heavy-weight? just mark component as dirty?
        this.eventHub.publish(Events.UIUpdate, null);
    }

    private onTickerChanged(msg: any, data: any) {
        this.lcd.label = data.id;
        this.reload(data.id);
    }
}
