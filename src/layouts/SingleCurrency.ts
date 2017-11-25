import { LivePriceComponent } from "../components/LivePriceComponent";
import { PriceHistoryComponent } from "../components/PriceHistoryComponent";
import {Element, Location, Size} from "./LayoutBase";
import Container from "../Container";
import {Events} from "../events/Events";
import {Ticker} from "../types/Ticker";
import {PriceHistoryLineChartComponent} from "../components/PriceHistoryLineChartComponent";
import {BigLabelComponent} from "../components/BigLabelComponent";
import {KeyBinding} from "./KeyBinding";
import {ListComponent} from "../components/ListComponent";
import {StandardLayout} from "./StandardLayout";
import {Log} from "../Logger";

const logger = Log.getLogger("SingleCurrency");
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends StandardLayout {
    private bigLabelComponent: BigLabelComponent;
    private tickerList: ListComponent<Ticker>;
    private periodList: ListComponent<string>;
    private priceHistoryComponent: PriceHistoryComponent;
    private livePriceComponent: LivePriceComponent;
    private priceHistoryLineChartComponent: any;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;

        this.tickerList = container.componentFactory.createList("ticker", container);
        this.periodList = container.componentFactory.createList("period", container);

        this.bigLabelComponent = new BigLabelComponent(this.eventHub, "BTC-USD");
        this.priceHistoryComponent = new PriceHistoryComponent(this.eventHub, this.container.priceHistorySource);
        this.livePriceComponent = new LivePriceComponent(
            this.eventHub,
            "BTC-USD",
            this.container.livePriceSource,
            false,
        );
        this.priceHistoryLineChartComponent = new PriceHistoryLineChartComponent(
            this.eventHub, this.container.priceHistorySource);
    }

    public getElements(): Element[] {
        return super.getElements().concat([
            new Element(this.tickerList, new Location(0, 0), new Size(12, 2)),
            new Element(this.periodList, new Location(0, 0), new Size(12, 2)),
            new Element(this.bigLabelComponent, new Location(0, 0), new Size(2, 6)),
            new Element(this.livePriceComponent, new Location(0, 6), new Size(2, 6)),
            new Element(this.priceHistoryComponent, new Location(2, 6), new Size(10, 6)),
            new Element(this.priceHistoryLineChartComponent, new Location(2, 0), new Size(10, 6)),
        ]);
    }

    public bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(new KeyBinding(["t"], "[T]icker List"),
            (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding(["p"], "[P]eriod List"),
            (ch, key) => this.periodList.toggleVisibility());
    }

    protected postLoad() {
        this.eventHub.publish(Events.TickerChanged, new Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
