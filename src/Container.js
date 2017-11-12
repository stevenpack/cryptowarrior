"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSub = require("pubsub-js");
class Container {
    constructor() {
        this.eventHub = PubSub;
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map