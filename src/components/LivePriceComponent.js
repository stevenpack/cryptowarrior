"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events/events");
const Component_1 = require("./Component");
const Throttle_1 = require("../events/Throttle");
const contrib = require("blessed-contrib");
class LivePriceComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
        this.throttle = new Throttle_1.Throttle(200);
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.lcd, {
            label: "BTC-USD",
            strokeWidth: 1,
            elements: 4,
            display: "0000",
        });
    }
    setWidget(widget) {
        this.lcd = widget;
    }
    configure(widget, opts) {
    }
    async load(opts) {
        const callback = (data) => this.onPriceChanged(data);
        this.source.subscribe(["BTC-USD"], callback);
    }
    onPriceChanged(data) {
        switch (data.type) {
            case "open":
                if (!this.throttle.tryRemoveToken()) {
                    return;
                }
                this.lcd.setDisplay(data.price);
                // too heavy-weight? just mark component as dirty?
                this.eventHub.publish(events_1.Events.UIUpdate, null);
                break;
        }
    }
}
exports.LivePriceComponent = LivePriceComponent;
//# sourceMappingURL=LivePriceComponent.js.map