import { LivePriceComponent } from "../components/LivePriceComponent";
import { LoggerComponent } from "../components/LoggerComponent";
import { PriceHistoryComponent } from "../components/PriceHistoryComponent";
import { TickerListComponent } from "../components/TickerListComponent";
import { Element, LayoutBase, Location, Size } from "./LayoutBase";
import Container from "../Container";
import {Events} from "../events/Events";
import {Ticker} from "../types/Ticker";
import {PriceHistoryLineChartComponent} from "../components/PriceHistoryLineChartComponent";
import {PeriodListComponent} from "../components/PeriodListComponent";
import {ScreenListComponent} from "../components/ScreenListComponent";
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    public log: LoggerComponent;
    private tickerList: TickerListComponent;
    private periodList: PeriodListComponent;
    private screenList: ScreenListComponent;
    private priceHistoryComponent: PriceHistoryComponent;
    private livePriceComponent: LivePriceComponent;
    private priceHistoryLineChartComponent: any;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;

        this.tickerList = new TickerListComponent(this.eventHub, this.container.tickerSource);
        this.periodList = new PeriodListComponent(this.eventHub);
        this.screenList = new ScreenListComponent(this.eventHub, this.container.screenInventory);
        this.log = new LoggerComponent(this.eventHub);
        this.priceHistoryComponent = new PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent(
            this.eventHub,
            "BTC-USD",
            this.container.livePriceSource,
        );
        this.priceHistoryLineChartComponent = new PriceHistoryLineChartComponent(
            this.eventHub, this.container.priceHistorySource);
    }

    public getElements(): Element[] {

        return [
            new Element(this.log, new Location(9, 0), new Size(3, 12)),
            new Element(this.tickerList, new Location(0, 0), new Size(12, 2)),
            new Element(this.periodList, new Location(0, 0), new Size(12, 2)),
            new Element(this.screenList, new Location(0, 0), new Size(12, 6)),
            new Element(this.priceHistoryComponent, new Location(2, 7), new Size(10, 5)),
            new Element(this.livePriceComponent, new Location(0, 8), new Size(2, 4)),
            new Element(this.priceHistoryLineChartComponent, new Location(2, 0), new Size(10, 7)),
        ];
    }

    public bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(["t"], (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(["p"], (ch, key) => this.periodList.toggleVisibility());
        this.attachKeyHandler(["l"], (ch, key) => this.log.toggleVisibility());
        this.attachKeyHandler(["s"], (ch, key) => this.screenList.toggleVisibility());
    }

    protected postLoad() {
        this.eventHub.publish(Events.TickerChanged, new Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }

}
