import {Events} from "./events/Events";

export class UnhandledExceptionHandler {

    constructor(private eventHub) {
    }

    public init() {
        // let logger = Log.getLogger("UnhandledExceptionHandler");
        console.log("Attaching error handlers...");
        process.on("uncaughtException", (err) => {
            this.eventHub.publish(Events.LogEvent, `UncaughtException: ${err.message}`);
            // logger.fatal("process.on('uncaughtException'). Will rethrow");
            // logger.fatal(err.stack);
            // throw err;
        });
        process.on("unhandledRejection", (reason, p) => {
            this.eventHub.publish(Events.LogEvent,
                `Unhandled Rejection at: Promise ${p} reason: ${reason}`);
        });
    }
}
