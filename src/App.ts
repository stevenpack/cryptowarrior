
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";

export class App {
    public screen: SingleCurrency;

    constructor(private argv) {
    }

    public loadUI() {
        const container = new Container(this.argv);
        this.screen = new SingleCurrency(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => {/* done*/})
            .catch((err) => console.error(err));
    }
}
