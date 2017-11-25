import { LivePriceComponent } from "../components/LivePriceComponent";
import {Element, Location, Size} from "./LayoutBase";
import Container from "../Container";
import {StandardLayout} from "./StandardLayout";

/**
 * Displays multiple live prices
 */
export class LivePriceDashboard extends StandardLayout {
    private livePriceComponent1: LivePriceComponent;
    private livePriceComponent2: LivePriceComponent;
    private livePriceComponent3: LivePriceComponent;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;

        this.livePriceComponent1 = new LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource, true);
        this.livePriceComponent2 = new LivePriceComponent(this.eventHub, "ETH-USD", this.container.livePriceSource, true);
        this.livePriceComponent3 = new LivePriceComponent(this.eventHub, "LTC-USD", this.container.livePriceSource, true);
    }

    public getElements(): Element[] {
        return super.getElements().concat([
            new Element(this.livePriceComponent1, new Location(0, 0), new Size(2, 4)),
            new Element(this.livePriceComponent2, new Location(0, 4), new Size(2, 4)),
            new Element(this.livePriceComponent3, new Location(0, 8), new Size(2, 4)),
        ]);
    }
}
