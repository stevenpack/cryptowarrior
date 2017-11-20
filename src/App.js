"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
const Container_1 = require("./Container");
const UnhandledExceptionHandler_1 = require("./UnhandledExceptionHandler");
const ConfigLoader_1 = require("./ConfigLoader");
const Logger_1 = require("./Logger");
const LivePriceDashboard_1 = require("./layouts/LivePriceDashboard");
const ScreenManager_1 = require("./layouts/ScreenManager");
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
        // Load screen manager
        const screens = [];
        screens.push(new SingleCurrency_1.SingleCurrency(container.eventHub, container));
        screens.push(new LivePriceDashboard_1.LivePriceDashboard(container.eventHub, container));
        const screenManager = new ScreenManager_1.ScreenManager(container.eventHub, screens);
        // Show the screen
        screenManager.load(0);
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map