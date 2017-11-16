
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";
import {UnhandledExceptionHandler} from "./UnhandledExceptionHandler";
import {ConfigLoader} from "./ConfigLoader";

export class App {
    public screen: SingleCurrency;

    constructor(private argv) {
    }

    public loadUI() {

        const configHandler = new ConfigLoader(this.argv);
        const conf = configHandler.load();
        // todo: logger
        //Log.configure(conf.logFile, conf.logLevel);

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
