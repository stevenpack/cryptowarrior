"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
class ComponentBase {
    constructor(eventHub) {
        this.eventHub = eventHub;
    }
    toggleVisibility(element) {
        if (element.hidden) {
            element.show();
            element.setFront();
        }
        else {
            element.hide();
        }
        element.focus();
        this.eventHub.publish(Events_1.Events.UIUpdate, null);
    }
    fireUpdated() {
        this.eventHub.publish(Events_1.Events.UIUpdate, null);
    }
}
exports.ComponentBase = ComponentBase;
class WidgetOpts {
    constructor(widgetType, opts) {
        this.widgetType = widgetType;
        this.opts = opts;
    }
}
exports.WidgetOpts = WidgetOpts;
//# sourceMappingURL=Component.js.map