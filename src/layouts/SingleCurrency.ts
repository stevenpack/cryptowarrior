import { LivePriceComponent } from "../components/LivePriceComponent";
import { LoggerComponent } from "../components/LoggerComponent";
import { PriceHistoryComponent } from "../components/PriceHistoryComponent";
import { TickerListComponent } from "../components/TickerList";
import { Element, LayoutBase, Location, Size } from "./LayoutBase";
import Container from "../Container";
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    public log: LoggerComponent;
    private tickerList: TickerListComponent;
    private priceHistoryComponent: PriceHistoryComponent;
    private livePriceComponent: LivePriceComponent;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
    }

    public addElements() {
        this.tickerList = new TickerListComponent(this.eventHub, this.container.tickerSource);
        this.log = new LoggerComponent(this.eventHub);
        this.priceHistoryComponent = new PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent(this.eventHub, this.container.livePriceSource);

        this.elements.push(new Element(this.log, new Location(9, 0), new Size(3, 12)));
        this.elements.push(new Element(this.tickerList, new Location(0, 0), new Size(12, 2)));
        this.elements.push(new Element(this.priceHistoryComponent, new Location(2, 7), new Size(10, 5)));
        this.elements.push(new Element(this.livePriceComponent, new Location(0, 8), new Size(2, 4)));
    }

    public bindKeys() {
        super.bindKeys();
        this.screen.key(["t"], (ch, key) => {
            this.tickerList.toggleVisibility();
        });
        this.screen.key(["l"], (ch, key) => {
            this.log.toggleVisibility();
        });
    }
}
