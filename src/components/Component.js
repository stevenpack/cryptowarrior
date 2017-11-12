"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComponentBase {
    constructor(eventHub) {
        this.eventHub = eventHub;
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