"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("./events/Events");
const Logger_1 = require("./Logger");
class UnhandledExceptionHandler {
    constructor(eventHub) {
        this.eventHub = eventHub;
    }
    init() {
        const logger = Logger_1.Log.getLogger("UnhandledExceptionHandler");
        console.log("Attaching error handlers...");
        process.on("uncaughtException", (err) => {
            this.eventHub.publish(Events_1.Events.LogEvent, `UncaughtException: ${err.message}`);
            logger.error(err.message);
            logger.error(err.stack);
        });
        process.on("unhandledRejection", (reason, p) => {
            this.eventHub.publish(Events_1.Events.LogEvent, `Unhandled Rejection at: Promise ${p} reason: ${reason}`);
            logger.error(reason);
        });
    }
}
exports.UnhandledExceptionHandler = UnhandledExceptionHandler;
//# sourceMappingURL=UnhandledExceptionHandler.js.map