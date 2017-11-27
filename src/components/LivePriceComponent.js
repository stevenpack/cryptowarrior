"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
const Component_1 = require("./Component");
const Logger_1 = require("../Logger");
const contrib = require("blessed-contrib");
const logger = Logger_1.Log.getLogger("LivePriceComponent");
/**
 * Display live price.
 */
class LivePriceComponent extends Component_1.ComponentBase {
    constructor(eventHub, tickerId, source, ignoreTickerChange) {
        super(eventHub);
        this.tickerId = tickerId;
        this.source = source;
        this.ignoreTickerChange = ignoreTickerChange;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.lcd, {
            label: this.ignoreTickerChange ? `Live (${this.tickerId})` : "Live",
            strokeWidth: 2,
            elements: 7,
            display: "0000.00",
        });
    }
    setWidget(widget) {
        this.lcd = widget;
    }
    configure(widget, opts) {
        if (!this.ignoreTickerChange) {
            this.subscribe(Events_1.Events.TickerChanged, this.onTickerChanged.bind(this));
        }
    }
    async load(opts) {
        this.subscriptionId = await this.source.subscribe(null, this.onPriceChanged.bind(this));
    }
    async unload() {
        super.unload();
        this.source.unsubscribe(this.subscriptionId);
    }
    onPriceChanged(livePrice) {
        if (livePrice.id !== this.tickerId) {
            return;
        }
        this.lcd.setDisplay(livePrice.price);
        this.publish(Events_1.Events.UIUpdate, null);
    }
    onTickerChanged(msg, data) {
        this.lcd.label = data.id;
        this.lcd.setDisplay("0000.00");
        this.tickerId = data.id;
    }
}
exports.LivePriceComponent = LivePriceComponent;
//# sourceMappingURL=LivePriceComponent.js.map