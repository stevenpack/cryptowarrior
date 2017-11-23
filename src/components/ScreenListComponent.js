"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const events_1 = require("../events/events");
const Component_1 = require("./Component");
/**
 * Auto generated screen list based on LayoutDatails.
 *
 * Fires ScreenChanged, which ScreenManager listens to to switch screens in and out
 */
class ScreenListComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Screens",
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
        this.list.hide();
        this.publish(events_1.Events.ScreenChanged, index);
        this.publish(events_1.Events.LogEvent, "New Screen: " + this.screens[index].name);
    }
    async load(opts) {
        this.list.clearItems();
        this.screens = await this.source.getData(null);
        for (const s of this.screens) {
            this.list.pushItem(`${s.index + 1}. ${s.name}`);
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
exports.ScreenListComponent = ScreenListComponent;
//# sourceMappingURL=ScreenListComponent.js.map