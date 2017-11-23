"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../Logger");
const logger = Logger_1.Log.getLogger("GdaxLogger");
/**
 * gdax-tt specific logger, passed into feeds. Delegates calls to our own Log logger
 */
class GdaxLogger {
    log(level, message, meta) {
        logger.trace(message);
    }
    error(err) {
        logger.error(err.stack);
    }
}
exports.GdaxLogger = GdaxLogger;
//# sourceMappingURL=GdaxLogger.js.map