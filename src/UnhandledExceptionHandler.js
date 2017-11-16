"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("./events/Events");
class UnhandledExceptionHandler {
    constructor(eventHub) {
        this.eventHub = eventHub;
    }
    init() {
        // let logger = Log.getLogger("UnhandledExceptionHandler");
        console.log("Attaching error handlers...");
        process.on("uncaughtException", (err) => {
            this.eventHub.publish(Events_1.Events.LogEvent, `UncaughtException: ${err.message}`);
            // logger.fatal("process.on('uncaughtException'). Will rethrow");
            // logger.fatal(err.stack);
            // throw err;
        });
        process.on("unhandledRejection", (reason, p) => {
            this.eventHub.publish(Events_1.Events.LogEvent, `Unhandled Rejection at: Promise ${p} reason: ${reason}`);
        });
    }
}
exports.UnhandledExceptionHandler = UnhandledExceptionHandler;
//# sourceMappingURL=UnhandledExceptionHandler.js.map