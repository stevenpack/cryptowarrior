import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {Throttle} from "../events/Throttle";
import {IStreamingSource} from "../sources/Interfaces";
import {LivePrice} from "../types/LivePrice";
import {Log} from "../Logger";
const contrib = require("blessed-contrib");

const logger = Log.getLogger("LivePriceComponent");
export class LivePriceComponent extends ComponentBase implements IComponent {
    public lcd: any;

    private throttle: Throttle;

    constructor(eventHub, private tickerId: string, private source: IStreamingSource<LivePrice>) {
        super(eventHub);
        this.throttle = new Throttle(200);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,
            {
                label: "Live price",
                strokeWidth: 2,
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
        this.source.subscribe(null, this.onPriceChanged.bind(this));
    }

    public reload(ticker: string) {
        const callback = (data) => this.onPriceChanged(data);
        this.source.unsubscribe();
        this.source.subscribe([ticker], callback);
    }

    public onPriceChanged(livePrice: LivePrice) {

        if (livePrice.id !== this.tickerId) {
            return;
        }

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
