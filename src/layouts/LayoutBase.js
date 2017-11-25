"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const Events_1 = require("../events/Events");
const Throttle_1 = require("../events/Throttle");
const KeyBinding_1 = require("./KeyBinding");
const Logger_1 = require("../Logger");
class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Location = Location;
class Size {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
}
exports.Size = Size;
/**
 * An `Element` is composed of a `IComponent`, `Location` and `Size` to make up
 * part of a `LayoutBase`
 */
class Element {
    constructor(component, location, size) {
        this.component = component;
        this.location = location;
        this.size = size;
    }
}
exports.Element = Element;
class LayoutDetails {
    constructor(index, name, description) {
        this.index = index;
        this.name = name;
        this.description = description;
    }
}
exports.LayoutDetails = LayoutDetails;
/**
 * Base class for all Layouts.
 *
 * Responsible for building its components and making sure everything is subscribed and unsubscribed.
 */
const logger = Logger_1.Log.getLogger("LayoutBase");
class LayoutBase {
    constructor(rows, cols, eventHub, container) {
        this.rows = rows;
        this.cols = cols;
        this.eventHub = eventHub;
        this.container = container;
        this.renderCount = 0;
        this.elements = [];
        this.uiThrottle = new Throttle_1.Throttle(200);
    }
    init() {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({ rows: this.rows, cols: this.cols, screen: this.screen });
        this.keybindings = [];
        this.eventSubscriptionTokens = [];
        const elements = this.getElements();
        this.elements.push.apply(this.elements, elements);
        this.build();
        // Render the elements as soon as they're ready
        this.screen.render();
        this.subscribeEvents();
        this.bindKeys();
        this.setLogger();
    }
    build() {
        for (const element of this.elements) {
            const component = element.component;
            const loc = element.location;
            const size = element.size;
            // Create
            const widgetOpts = component.getWidgetOpts();
            const widget = this.grid.set(loc.x, loc.y, size.rows, size.cols, widgetOpts.widgetType, widgetOpts.opts);
            // Store reference (because we are creating the actual instance, not the component)
            component.setWidget(widget);
            // Configure
            component.configure(widget);
        }
    }
    async load() {
        this.preLoad();
        for (const element of this.elements) {
            try {
                await element.component.load();
            }
            catch (e) {
                logger.error(`Failed to load component. Error: ${e.message}`, e);
            }
        }
        this.postLoad();
        this.screen.render();
    }
    async unload() {
        for (const element of this.elements) {
            try {
                await element.component.unload();
            }
            catch (e) {
                this.logger.log(`Failed to unload component ${element.component}. Error: ${e.message}`);
            }
        }
        this.elements = [];
        this.unsubscribeEvents();
        this.unbindKeys();
        this.screen.destroy();
    }
    getData(opts) {
        return Promise.resolve(this.keybindings);
    }
    subscribeEvents() {
        this.subscribe(Events_1.Events.UIUpdate, this.onUIUpdate.bind(this));
        this.subscribe(Events_1.Events.LogEvent, this.onLogEvent.bind(this));
    }
    subscribe(event, handler) {
        const token = this.eventHub.subscribe(event, handler);
        this.eventSubscriptionTokens.push(token);
    }
    unsubscribeEvents() {
        for (const token of this.eventSubscriptionTokens) {
            this.eventHub.unsubscribe(token);
        }
    }
    bindKeys() {
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["q", "C-c"], "[Q]uit"), (ch, key) => {
            return process.exit(0);
        });
    }
    unbindKeys() {
        for (const kb of this.keybindings) {
            this.screen.removeKey(kb.keys);
        }
    }
    attachKeyHandler(keybinding, handler) {
        this.keybindings.push(keybinding);
        this.screen.key(keybinding.keys, (ch, key) => handler(ch, key));
    }
    preLoad() {
        /* Optionally overridden by inheritor */
    }
    postLoad() {
        /* Optionally overridden by inheritor */
    }
    onUIUpdate(msg, data) {
        const force = data;
        // Restrict UI updates to maximum of x/sec (see this.uiThrottle)
        if (force || this.uiThrottle.tryRemoveToken()) {
            this.renderCount++;
            if (this.renderCount % 100 === 0) {
                this.onLogEvent(null, `+100 screen render calls (total: ${this.renderCount})`);
            }
            this.screen.render();
        }
    }
    onLogEvent(msg, data) {
        if (this.logger) {
            this.logger.log(data);
        }
    }
    setLogger() {
        for (const e of this.elements) {
            if (this.isLogger(e)) {
                const component = e.component;
                this.logger = component;
                break;
            }
        }
    }
    isLogger(element) {
        return element.component.log !== undefined;
    }
}
exports.LayoutBase = LayoutBase;
//# sourceMappingURL=LayoutBase.js.map