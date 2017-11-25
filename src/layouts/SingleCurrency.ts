import { LivePriceComponent } from "../components/LivePriceComponent";
import { LoggerComponent } from "../components/LoggerComponent";
import { PriceHistoryComponent } from "../components/PriceHistoryComponent";
import {Element, LayoutBase, LayoutDetails, Location, Size} from "./LayoutBase";
import Container from "../Container";
import {Events} from "../events/Events";
import {Ticker} from "../types/Ticker";
import {PriceHistoryLineChartComponent} from "../components/PriceHistoryLineChartComponent";
import {BigLabelComponent} from "../components/BigLabelComponent";
import {KeyBinding} from "./KeyBinding";
import {KeyHelpComponent} from "../components/KeyHelpComponent";
import {ListComponent} from "../components/ListComponent";
import {Period} from "../types/Period";
import {EnumEx} from "../types/EnumEx";
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    public log: LoggerComponent;
    private keyhelpComponent: KeyHelpComponent;
    private bigLabelComponent: BigLabelComponent;
    private tickerList: ListComponent<Ticker>;
    private periodList: ListComponent<string>;
    private screenList: ListComponent<LayoutDetails>;
    private priceHistoryComponent: PriceHistoryComponent;
    private livePriceComponent: LivePriceComponent;
    private priceHistoryLineChartComponent: any;
    private source: string;

    constructor(eventHub: PubSubJS.Base, container: Container) {
        super(12, 12, eventHub, container);
        this.source = container.source;

        this.keyhelpComponent = new KeyHelpComponent(this.eventHub, this);

        this.tickerList = container.componentFactory.createList("ticker", container);
        this.periodList = container.componentFactory.createList("period", container);
        this.screenList = container.componentFactory.createList("screen", container);

        this.log = new LoggerComponent(this.eventHub);
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

        return [
            new Element(this.log, new Location(9, 0), new Size(3, 12)),
            new Element(this.keyhelpComponent, new Location(0, 0), new Size(12, 2)),
            new Element(this.tickerList, new Location(0, 0), new Size(12, 2)),
            new Element(this.periodList, new Location(0, 0), new Size(12, 2)),
            new Element(this.screenList, new Location(0, 0), new Size(12, 6)),
            new Element(this.bigLabelComponent, new Location(0, 0), new Size(2, 6)),
            new Element(this.livePriceComponent, new Location(0, 6), new Size(2, 6)),
            new Element(this.priceHistoryComponent, new Location(2, 6), new Size(10, 6)),
            new Element(this.priceHistoryLineChartComponent, new Location(2, 0), new Size(10, 6)),
        ];
    }

    public bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(new KeyBinding(["h"], "Show/Hide [H]elp"),
            (ch, key) => this.keyhelpComponent.toggleVisibility());
        this.attachKeyHandler(new KeyBinding(["t"], "Show/Hide [T]icker List"),
            (ch, key) => this.tickerList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding(["p"], "Show/Hide [P]eriod List"),
            (ch, key) => this.periodList.toggleVisibility());
        this.attachKeyHandler(new KeyBinding(["l"], "Show/Hide [L]og Panel"),
            (ch, key) => this.log.toggleVisibility());
        this.attachKeyHandler(new KeyBinding(["s"], "Show/Hide [S]creen list"),
            (ch, key) => this.screenList.toggleVisibility());
    }

    protected postLoad() {
        this.eventHub.publish(Events.TickerChanged, new Ticker("BTC-USD"));
        this.log.log(`Source: ${this.source}`);
    }
}
