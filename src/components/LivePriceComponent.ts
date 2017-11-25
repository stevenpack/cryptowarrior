import { Events } from "../events/Events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {IStreamingSource} from "../sources/Interfaces";
import {LivePrice} from "../types/LivePrice";
import {Log} from "../Logger";
const contrib = require("blessed-contrib");

const logger = Log.getLogger("LivePriceComponent");

/**
 * Display live price.
 */
export class LivePriceComponent extends ComponentBase implements IComponent {

    // TODO: Load initial price from ticker/last trade
    public lcd: any;
    private subscriptionId: number;

    constructor(eventHub, private tickerId: string, private source: IStreamingSource<LivePrice>,
                private ignoreTickerChange: boolean) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,
            {
                label: this.ignoreTickerChange ? `Live (${this.tickerId})` : "Live",
                strokeWidth: 2,
                elements: 7,
                display: "0000.00",
            });
    }

    public setWidget(widget: any) {
        this.lcd = widget;
    }

    public configure(widget: any, opts?: any) {
        if (!this.ignoreTickerChange) {
            this.subscribe(Events.TickerChanged, this.onTickerChanged.bind(this));
        }
    }

    public async load(opts?: any) {
        this.subscriptionId = await this.source.subscribe(null, this.onPriceChanged.bind(this));
    }

    public async unload() {
        super.unload();
        this.source.unsubscribe(this.subscriptionId);
    }

    public onPriceChanged(livePrice: LivePrice) {

        if (livePrice.id !== this.tickerId) {
            return;
        }

        this.lcd.setDisplay(livePrice.price);
        // TODO: too heavy-weight for event per UI update? just mark component as dirty? and have a render timer?
        this.publish(Events.UIUpdate, null);
    }

    private onTickerChanged(msg: any, data: any) {
        this.lcd.label = data.id;
        this.lcd.setDisplay("0000.00");
        this.tickerId = data.id;
    }
}
