import {Events} from "./events/Events";
import {Log} from "./Logger";

export class UnhandledExceptionHandler {

    constructor(private eventHub) {
    }

    public init() {
        const logger = Log.getLogger("UnhandledExceptionHandler");
        console.log("Attaching error handlers...");
        process.on("uncaughtException", (err) => {
            this.eventHub.publish(Events.LogEvent, `UncaughtException: ${err.message}`);
            logger.error(err.message);
            logger.error(err.stack);
        });
        process.on("unhandledRejection", (reason, p) => {
            this.eventHub.publish(Events.LogEvent,
                `Unhandled Rejection at: Promise ${p} reason: ${reason}`);
            logger.error(reason);
        });
    }
}
