import {Logger} from "log4js";
/**
 * Created by steve on 20/11/16.
 */
export class Log {

    public static getLogger(name: string): Logger {
        return Log.log4js.getLogger(name);
    }

    public static init(logFilePath: string, logLevel: string) {
        console.info("Configuring logger...");
        Log.log4js.configure({
            appenders: {
                file: { type: "file", filename: logFilePath },
                console: { type: "console"},
            },
            categories: { default: { appenders: ["file"/*, "console"*/], level: logLevel } },
        });
        console.info(`Logger configured. Root logLevel: ${logLevel}`);
    }
    private static log4js = require("log4js");
}
