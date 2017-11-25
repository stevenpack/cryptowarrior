"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const Events_1 = require("../events/Events");
const Component_1 = require("./Component");
const Logger_1 = require("../Logger");
/**
 * Component to choose a time period (Second, Minute, Hourly, Daily, Weekly etc.)
 *
 * Could be generalized ListPickerbase
 */
const logger = Logger_1.Log.getLogger("ListComponent");
class ListComponent extends Component_1.ComponentBase {
    constructor(eventHub, label, source, event, fnDisplay) {
        super(eventHub);
        this.label = label;
        this.source = source;
        this.event = event;
        this.fnDisplay = fnDisplay;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: this.label,
            selectedBg: "green",
            focusable: true,
            hidden: true,
            keys: true,
            mouse: true,
            vi: true,
        });
    }
    setWidget(widget) {
        this.list = widget;
    }
    configure(widget, opts) {
        this.list.on("select", this.onSelected.bind(this));
    }
    onSelected(item, index) {
        const selectedItem = this.items[index];
        this.publish(this.event, selectedItem);
        this.publish(Events_1.Events.LogEvent, `New Selection: ${this.format(selectedItem)}`);
        this.list.hide();
    }
    async load(opts) {
        this.list.clearItems();
        this.items = await this.source.getData(opts);
        for (const item of this.items) {
            const display = this.format(item);
            this.list.pushItem(display);
        }
    }
    format(item) {
        return this.fnDisplay ? this.fnDisplay(item) : item;
    }
    unload() {
        super.unload();
        this.list.removeAllListeners("select");
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.ListComponent = ListComponent;
//# sourceMappingURL=ListComponent.js.map