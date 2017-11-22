import {Logger} from "gdax-trading-toolkit/build/src/utils";
import {Log} from "../../Logger";

const logger = Log.getLogger("InitLogger");
export class GdaxLogger implements Logger {
    public log(level: string, message: string, meta?: any): void {
        logger.trace(message);
    }

    public error(err: Error): void {
        logger.error(err.stack);
    }
}
