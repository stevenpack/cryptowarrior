"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const GdaxApi_1 = require("../sources/GdaxApi");
const events_1 = require("../events/events");
const contrib = require('blessed-contrib');
class LivePriceComponent extends Component_1.ComponentBase {
    constructor(eventHub) {
        super(eventHub);
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.lcd, {
            label: "BTC-USD",
            //segmentWidth: 0.05,
            //segmentInterval: 0.11,
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
        let rawSource = new GdaxApi_1.GdaxApi();
        let callback = data => this.onPriceChanged(data);
        rawSource.subscribe(callback);
    }
    onPriceChanged(data) {
        switch (data.type) {
            case "open":
                this.lcd.setDisplay(data.price);
                this.eventHub.publish(events_1.Events.UIUpdate, null);
                break;
        }
    }
}
exports.LivePriceComponent = LivePriceComponent;
//# sourceMappingURL=LivePriceComponent.js.map