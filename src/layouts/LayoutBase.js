"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const contrib = require('blessed-contrib');
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
class Element {
    constructor(component, location, size) {
        this.component = component;
        this.location = location;
        this.size = size;
    }
}
exports.Element = Element;
class LayoutBase {
    constructor(rows, cols) {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({ rows: rows, cols: cols, screen: this.screen });
        this.elements = [];
        //todo: check javascript spec re: calling abstract from constructor
        this.init();
    }
    init() {
        this.addElements();
        this.build();
        this.listen();
        this.bindKeys();
    }
    build() {
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            let component = element.component;
            let loc = element.location;
            let size = element.size;
            //Create
            let widgetOpts = component.getWidgetOpts();
            //TODO: store position with the component
            let widget = this.grid.set(loc.x, loc.y, size.rows, size.cols, widgetOpts.widgetType, widgetOpts.opts);
            //Store reference
            component.setWidget(widget);
            //Configure
            component.configure(widget);
        }
    }
    listen() {
        for (let element of this.elements) {
            //TODO: throttle updates to once per interval e.g. 100ms
            if (element.component instanceof EventEmitter) {
                element.component.on("updated", () => this.screen.render());
            }
        }
    }
    bindKeys() {
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });
    }
    async load() {
        for (let element of this.elements) {
            await element.component.load();
        }
        this.screen.render();
    }
}
exports.LayoutBase = LayoutBase;
//# sourceMappingURL=LayoutBase.js.map