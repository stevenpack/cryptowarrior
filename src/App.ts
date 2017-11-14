
import { SingleCurrency } from "./layouts/SingleCurrency";
import Container from "./Container";

export class App {
    public screen: SingleCurrency;

    constructor() {
    }

    public loadUI() {
        const container = new Container();
        this.screen = new SingleCurrency(container.eventHub, container);
        this.screen.load()
            .then(() => {/* done*/})
            .catch((err) => console.error(err));
    }
}
