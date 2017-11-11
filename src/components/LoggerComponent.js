"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const events_1 = require("events");
const blessed = require("blessed");
const contrib = require('blessed-contrib');
class LoggerComponent extends events_1.EventEmitter {
    constructor() {
        super();
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.log, {
            label: "Log",
        });
    }
    setWidget(widget) {
        this.logger = widget;
    }
    configure(widget, opts) {
    }
    async load(opts) {
        this.logger.log("Logger created");
    }
    //TODO: common component
    toggleVisibility() {
        if (this.logger.hidden) {
            this.logger.show();
            this.logger.setFront();
        }
        else {
            this.logger.hide();
        }
        this.logger.focus();
        //this.logger.select(0);
        this.emit("updated");
    }
}
exports.LoggerComponent = LoggerComponent;
//# sourceMappingURL=LoggerComponent.js.map