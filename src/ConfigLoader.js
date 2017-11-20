"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigLoader {
    constructor(argv) {
        this.argv = argv;
    }
    load() {
        const env = this.argv.env || "Local";
        const configPath = `./conf/${env}Config.js`;
        console.log(`Env: ${env} -> ${configPath}`);
        console.log(`Loading default..`);
        const confClass = require(configPath).default;
        console.log(`Loading class..`);
        const conf = new confClass();
        console.log(`Configuration: ${JSON.stringify(conf, null, 2)}`);
        return conf;
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=ConfigLoader.js.map