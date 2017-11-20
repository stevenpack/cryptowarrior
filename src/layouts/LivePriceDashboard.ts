import { LivePriceComponent } from "../components/LivePriceComponent";
import { LoggerComponent } from "../components/LoggerComponent";
import { PriceHistoryComponent } from "../components/PriceHistoryComponent";
import { TickerListComponent } from "../components/TickerList";
import { Element, LayoutBase, Location, Size } from "./LayoutBase";
import Container from "../Container";
import {Events} from "../events/Events";
import {Ticker} from "../types/Ticker";
import {PriceHistoryLineChartComponent} from "../components/PriceHistoryLineChartComponent";
import {PeriodListComponent} from "../components/PeriodListComponent";
/**
 * Layout optimized for viewing a single currency
 */
export class LivePriceDashboard extends LayoutBase {
    public log: LoggerComponent;
    private livePriceComponent1: LivePriceComponent;
    private livePriceComponent2: LivePriceComponent;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;

        this.log = new LoggerComponent(this.eventHub);
        this.livePriceComponent1 = new LivePriceComponent(this.eventHub, "BTC-USD", this.container.livePriceSource);
        this.livePriceComponent2 = new LivePriceComponent(this.eventHub, "ETH-USD", this.container.livePriceSource);
    }

    public getElements(): Element[] {
        return [
            new Element(this.log, new Location(9, 0), new Size(3, 12)),
            new Element(this.livePriceComponent1, new Location(0, 8), new Size(2, 4)),
            new Element(this.livePriceComponent2, new Location(3, 8), new Size(2, 4)),
        ];
    }

    public bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
    }

    protected postLoad() {
        this.eventHub.publish(Events.TickerChanged, new Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
