"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const GdaxApi_1 = require("../sources/GdaxApi");
const blessed = require("blessed");
class TickerListComponent {
    constructor() {
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Ticker",
            hidden: true
        });
    }
    setWidget(widget) {
        this.list = widget;
    }
    configure(widget, opts) {
    }
    async load(opts) {
        let rawSource = new GdaxApi_1.GdaxApi();
        let products = await rawSource.getProducts();
        for (let p of products) {
            this.list.pushLine(p.id);
        }
    }
    toggleVisibility() {
        if (this.list.hidden) {
            this.list.show();
            this.list.setFront();
        }
        else {
            this.list.hide();
        }
    }
}
exports.TickerListComponent = TickerListComponent;
//# sourceMappingURL=TickerList.js.map