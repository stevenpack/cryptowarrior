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
            hidden: true
        });
    }
    setWidget(widget) {
        this.logger = widget;
    }
    configure(widget, opts) {
        this.logger.key('up', (ch, key) => {
            this.logger.top -= 1;
            this.logger.height += +1;
        });
        this.logger.key('down', (ch, key) => {
            this.logger.top += 1;
            this.logger.height -= +1;
        });
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
        //this.logger.select(0);q
        this.emit("updated");
    }
}
exports.LoggerComponent = LoggerComponent;
//# sourceMappingURL=LoggerComponent.js.map