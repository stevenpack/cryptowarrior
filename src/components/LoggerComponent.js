"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const Component_1 = require("./Component");
class LoggerComponent extends Component_1.ComponentBase {
    constructor(eventHub) {
        super(eventHub);
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.log, {
            label: "Log",
            hidden: true,
        });
    }
    setWidget(widget) {
        this.logger = widget;
    }
    configure(widget, opts) {
        this.logger.key("up", (ch, key) => {
            this.logger.top -= 1;
            this.logger.height += +1;
        });
        this.logger.key("down", (ch, key) => {
            this.logger.top += 1;
            this.logger.height -= +1;
        });
    }
    toggleVisibility() {
        super.toggleVisibility(this.logger);
    }
    async load(opts) {
        this.logger.log("Logger created. Up/Down arrow to resize.");
    }
    log(msg) {
        this.logger.log(msg);
    }
}
exports.LoggerComponent = LoggerComponent;
//# sourceMappingURL=LoggerComponent.js.map