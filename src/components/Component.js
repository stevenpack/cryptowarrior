"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
const events_1 = require("events");
const Logger_1 = require("../Logger");
const logger = Logger_1.Log.getLogger("ComponentBase");
class ComponentBase extends events_1.EventEmitter {
    constructor(eventHub) {
        super();
        this.eventHub = eventHub;
        // Event subscriptions
        this.eventSubscriptionTokens = [];
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
        this.fireUpdated(true);
    }
    unload() {
        // Most non-streaming components need do nothing
        this.unsubscribeAll();
    }
    unsubscribeAll() {
        for (const token of this.eventSubscriptionTokens) {
            logger.debug(`Unsubscribe from event ${token}`);
            this.eventHub.unsubscribe(token);
        }
        this.eventSubscriptionTokens = [];
    }
    subscribe(event, handler) {
        const token = this.eventHub.subscribe(event, handler);
        logger.debug(`Subscribe to event ${event} with ${token}`);
        this.eventSubscriptionTokens.push(token);
    }
    publish(event, data) {
        this.eventHub.publish(event, data);
    }
    fireUpdated(force) {
        this.eventHub.publish(Events_1.Events.UIUpdate, force);
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