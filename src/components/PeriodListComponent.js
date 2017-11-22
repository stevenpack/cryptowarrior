"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const events_1 = require("../events/events");
const Component_1 = require("./Component");
const EnumEx_1 = require("../types/EnumEx");
const Period_1 = require("../types/Period");
/**
 * Component to choose a time period (Second, Minute, Hourly, Daily, Weekly etc.)
 *
 * Could be generalized ListPickerbase
 */
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
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }
    onSelected(item, index) {
        const period = this.periods[index];
        this.eventHub.publish(events_1.Events.PeriodChanged, Period_1.Period[period]);
        this.eventHub.publish(events_1.Events.LogEvent, `New Period: ${period} (${Period_1.Period[period]} secs)`);
        this.list.hide();
    }
    async load(opts) {
        this.list.clearItems();
        this.periods = EnumEx_1.EnumEx.getNames(Period_1.Period);
        for (const p of this.periods) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(p);
        }
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.PeriodListComponent = PeriodListComponent;
//# sourceMappingURL=PeriodListComponent.js.map