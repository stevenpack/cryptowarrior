"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const Events_1 = require("../events/Events");
const Component_1 = require("./Component");
const EnumEx_1 = require("../types/EnumEx");
const Period_1 = require("../types/Period");
const Logger_1 = require("../Logger");
/**
 * Component to choose a time period (Second, Minute, Hourly, Daily, Weekly etc.)
 *
 * Could be generalized ListPickerbase
 */
const logger = Logger_1.Log.getLogger("PeriodListComponent");
class PeriodListComponent extends Component_1.ComponentBase {
    constructor(eventHub) {
        super(eventHub);
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Time Period",
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
        const period = this.periods[index];
        this.publish(Events_1.Events.PeriodChanged, Period_1.Period[period]);
        this.publish(Events_1.Events.LogEvent, `New Period: ${period} (${Period_1.Period[period]} secs)`);
        this.list.hide();
    }
    async load(opts) {
        this.list.clearItems();
        this.periods = EnumEx_1.EnumEx.getNames(Period_1.Period);
        for (const p of this.periods) {
            this.list.pushItem(p);
        }
    }
    unload() {
        super.unload();
        this.list.removeAllListeners("select");
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.PeriodListComponent = PeriodListComponent;
//# sourceMappingURL=PeriodListComponent.js.map