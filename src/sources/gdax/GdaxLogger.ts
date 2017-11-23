import {Logger} from "gdax-trading-toolkit/build/src/utils";
import {Log} from "../../Logger";

const logger = Log.getLogger("GdaxLogger");

/**
 * gdax-tt specific logger, passed into feeds. Delegates calls to our own Log logger
 */
export class GdaxLogger implements Logger {
    public log(level: string, message: string, meta?: any): void {
        logger.trace(message);
    }

    public error(err: Error): void {
        logger.error(err.stack);
    }
}
