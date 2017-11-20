
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";
import {UnhandledExceptionHandler} from "./UnhandledExceptionHandler";
import {ConfigLoader} from "./ConfigLoader";
import {Log} from "./Logger";
import {LivePriceComponent} from "./components/LivePriceComponent";
import {LivePriceDashboard} from "./layouts/LivePriceDashboard";
import {LayoutBase} from "./layouts/LayoutBase";

export class App {
    public screen: LayoutBase;

    constructor(private argv) {
    }

    public load() {

        // Load config
        const configHandler = new ConfigLoader(this.argv);
        const conf = configHandler.load();

        // Init logger
        Log.init(conf.logFile, conf.logLevel);
        const logger = Log.getLogger("InitLogger");
        logger.info("Logger configured");

        // IoC container and logger
        const container = new Container(this.argv);
        const exHandler = new UnhandledExceptionHandler(container.eventHub);
        exHandler.init();

        // Load screen
        // this.screen = new SingleCurrency(container.eventHub, container);
        this.screen = new LivePriceDashboard(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => {/* done*/})
            .catch((err) => console.error(err));
    }
}
