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
export class SingleCurrency extends LayoutBase {
    public log: LoggerComponent;
    private livePriceComponent: LivePriceComponent;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;
    }

    public getElements(): Element[] {
        this.log = new LoggerComponent(this.eventHub);
        this.livePriceComponent = new LivePriceComponent(this.eventHub, this.container.livePriceSource);

        const elements = [];
        elements.push(new Element(this.log, new Location(9, 0), new Size(3, 12)));
        //elements.push(new Element(this.tickerList, new Location(0, 0), new Size(12, 2)));
        elements.push(new Element(this.livePriceComponent, new Location(0, 8), new Size(2, 4)));
        return elements;
    }

    public bindKeys() {
        super.bindKeys();
        // this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
    }

    protected postLoad() {
        this.eventHub.publish(Events.TickerChanged, new Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
