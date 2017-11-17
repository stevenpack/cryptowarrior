
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";
import {UnhandledExceptionHandler} from "./UnhandledExceptionHandler";
import {ConfigLoader} from "./ConfigLoader";
import {Log} from "./Logger";

export class App {
    public screen: SingleCurrency;

    constructor(private argv) {
    }

    public loadUI() {

        const configHandler = new ConfigLoader(this.argv);
        const conf = configHandler.load();
        // todo: logger
        Log.init(conf.logFile, conf.logLevel);
        const logger = Log.getLogger("InitLogger");
        logger.info("Logger configured");

        const container = new Container(this.argv);
        const exHandler = new UnhandledExceptionHandler(container.eventHub);
        exHandler.init();
        this.screen = new SingleCurrency(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => {/* done*/})
            .catch((err) => console.error(err));
    }
}
