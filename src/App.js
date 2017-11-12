"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
const Container_1 = require("./Container");
let contrib = require('blessed-contrib');
class App {
    constructor() {
    }
    loadUI() {
        let container = new Container_1.default();
        this.screen = new SingleCurrency_1.SingleCurrency(container.eventHub);
        this.screen.load();
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map