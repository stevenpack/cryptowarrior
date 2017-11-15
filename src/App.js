"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
const Container_1 = require("./Container");
class App {
    constructor() {
    }
    loadUI() {
        const container = new Container_1.default();
        this.screen = new SingleCurrency_1.SingleCurrency(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => { })
            .catch((err) => console.error(err));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map