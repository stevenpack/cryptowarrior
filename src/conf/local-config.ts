
import {IConfig} from "./iconfig";
import CommonConfig from "./CommonConfig";

export default //noinspection JSUnusedGlobalSymbols
class LocalConfig extends CommonConfig implements IConfig {
    public logLevel = "TRACE";
    public logFile = "logs/local-finance.log";
}
