"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutBase_1 = require("./LayoutBase");
class ScreenInventory {
    constructor() {
        this.layoutDetails = [];
        this.layoutDetails.push(new LayoutBase_1.LayoutDetails(0, "Single currency", "Live price, history and charts for a single currency"));
        this.layoutDetails.push(new LayoutBase_1.LayoutDetails(1, "Multi currency dashboard", "Multiple live streaming prices"));
    }
    getLayoutDetails() {
        return this.layoutDetails;
    }
    getData(opts) {
        return Promise.resolve(this.getLayoutDetails());
    }
}
exports.ScreenInventory = ScreenInventory;
//# sourceMappingURL=ScreenInventory.js.map