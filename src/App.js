"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
const UnhandledExceptionHandler_1 = require("./UnhandledExceptionHandler");
const ConfigLoader_1 = require("./ConfigLoader");
const Logger_1 = require("./Logger");
const LivePriceDashboard_1 = require("./layouts/LivePriceDashboard");
class App {
    constructor(argv) {
        this.argv = argv;
    }
    load() {
        // Load config
        const configHandler = new ConfigLoader_1.ConfigLoader(this.argv);
        const conf = configHandler.load();
        // Init logger
        Logger_1.Log.init(conf.logFile, conf.logLevel);
        const logger = Logger_1.Log.getLogger("InitLogger");
        logger.info("Logger configured");
        // IoC container and logger
        const container = new Container_1.default(this.argv);
        const exHandler = new UnhandledExceptionHandler_1.UnhandledExceptionHandler(container.eventHub);
        exHandler.init();
        // Load screen
        // this.screen = new SingleCurrency(container.eventHub, container);
        this.screen = new LivePriceDashboard_1.LivePriceDashboard(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => { })
            .catch((err) => console.error(err));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map