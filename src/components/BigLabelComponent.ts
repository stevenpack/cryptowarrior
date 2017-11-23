import { Events } from "../events/Events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {Log} from "../Logger";
const contrib = require("blessed-contrib");

const logger = Log.getLogger("BigLabelComponent");

/**
 * Show the ticker or any arbitrary text
 */
export class BigLabelComponent extends ComponentBase implements IComponent {
    public lcd: any;

    constructor(eventHub, private label: string) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,
            {
                label: "",
                strokeWidth: 2,
                elements: 7,
                display: "------",
            });
    }

    public setWidget(widget: any) {
        this.lcd = widget;
    }

    public configure(widget: any, opts?: any) {
        this.subscribe(Events.TickerChanged, this.onTickerChanged.bind(this));
    }

    public async load(opts?: any) {
        this.lcd.setDisplay(this.label);
    }

    private onTickerChanged(msg: any, data: any) {
        this.label = data.id;
        this.load();
    }
}
