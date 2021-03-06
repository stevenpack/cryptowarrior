"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
const Component_1 = require("./Component");
const Logger_1 = require("../Logger");
const contrib = require("blessed-contrib");
const logger = Logger_1.Log.getLogger("BigLabelComponent");
/**
 * Show the ticker or any arbitrary text
 */
class BigLabelComponent extends Component_1.ComponentBase {
    constructor(eventHub, label) {
        super(eventHub);
        this.label = label;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(contrib.lcd, {
            label: "",
            strokeWidth: 2,
            elements: 7,
            display: "------",
        });
    }
    setWidget(widget) {
        this.lcd = widget;
    }
    configure(widget, opts) {
        this.subscribe(Events_1.Events.TickerChanged, this.onTickerChanged.bind(this));
    }
    async load(opts) {
        this.lcd.setDisplay(this.label);
    }
    onTickerChanged(msg, data) {
        this.label = data.id;
        this.load();
    }
}
exports.BigLabelComponent = BigLabelComponent;
//# sourceMappingURL=BigLabelComponent.js.map