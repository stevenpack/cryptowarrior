
import {IConfig} from "./iconfig";
import CommonConfig from "./CommonConfig";

//noinspection JSUnusedGlobalSymbols
export default class LocalConfig extends CommonConfig implements IConfig {
    public logLevel = "TRACE";
    public logFile = "logs/local-crypto.log";
}
