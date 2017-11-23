
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";
import {UnhandledExceptionHandler} from "./UnhandledExceptionHandler";
import {ConfigLoader} from "./ConfigLoader";
import {Log} from "./Logger";
import {LivePriceComponent} from "./components/LivePriceComponent";
import {LivePriceDashboard} from "./layouts/LivePriceDashboard";
import {LayoutBase} from "./layouts/LayoutBase";
import {ScreenManager} from "./layouts/ScreenManager";

/**
 * Main app class
 */
export class App {

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
        logger.info("Starting...");

        // IoC container and logger
        const container = new Container(this.argv);
        const exHandler = new UnhandledExceptionHandler(container.eventHub);
        exHandler.init();

        // Load screen manager
        const screens = [];
        screens.push(new SingleCurrency(container.eventHub, container));
        screens.push(new LivePriceDashboard(container.eventHub, container));

        const screenManager = new ScreenManager(container.eventHub, screens);

        // Show the screen
        screenManager.load(0);
    }
}
