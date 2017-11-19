"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonConfig_1 = require("./CommonConfig");
//noinspection JSUnusedGlobalSymbols
class LocalConfig extends CommonConfig_1.default {
    constructor() {
        super(...arguments);
        this.logLevel = "TRACE";
        this.logFile = "logs/local-finance.log";
    }
}
exports.default = LocalConfig;
//# sourceMappingURL=LocalConfig.js.map