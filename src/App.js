"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
let contrib = require('blessed-contrib');
class App {
    constructor() {
    }
    loadUI() {
        this.screen = new SingleCurrency_1.SingleCurrency();
        this.screen.load();
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map