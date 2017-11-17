"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by steve on 20/11/16.
 */
class Log {
    static getLogger(name) {
        return Log.log4js.getLogger(name);
    }
    static init(logFilePath, logLevel) {
        console.info("Configuring logger...");
        // Log.log4js.configure({
        //     appenders: [
        //         { type: "console" },
        //         { type: "file", filename: logFilePath},
        //     ],
        // });
        Log.log4js.configure({
            appenders: {
                file: { type: "file", filename: logFilePath },
                console: { type: "console" },
            },
            categories: { default: { appenders: ["file", "console"], level: logLevel } },
        });
        //Log.log4js.setGlobalLogLevel(logLevel);
        console.info(`Logger configured. Root logLevel: ${logLevel}`);
    }
}
Log.log4js = require("log4js");
exports.Log = Log;
//# sourceMappingURL=Logger.js.map