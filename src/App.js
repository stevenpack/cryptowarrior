"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
const Container_1 = require("./Container");
const UnhandledExceptionHandler_1 = require("./UnhandledExceptionHandler");
const ConfigLoader_1 = require("./ConfigLoader");
class App {
    constructor(argv) {
        this.argv = argv;
    }
    loadUI() {
        const configHandler = new ConfigLoader_1.ConfigLoader(this.argv);
        const conf = configHandler.load();
        // todo: logger
        //Log.configure(conf.logFile, conf.logLevel);
        const container = new Container_1.default(this.argv);
        const exHandler = new UnhandledExceptionHandler_1.UnhandledExceptionHandler(container.eventHub);
        exHandler.init();
        this.screen = new SingleCurrency_1.SingleCurrency(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => { })
            .catch((err) => console.error(err));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map