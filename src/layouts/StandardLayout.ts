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
/**
 * Starting point with standard components like logger, keyhelp and screen chooser
 */
export class StandardLayout extends LayoutBase {
    public log: LoggerComponent;
    private keyhelpComponent: KeyHelpComponent;
    private screenList: ListComponent<LayoutDetails>;

    constructor(rows: number, cols: number, eventHub: PubSubJS.Base, container: Container) {
        super(rows, cols, eventHub, container);
        this.keyhelpComponent = new KeyHelpComponent(this.eventHub, this);
        this.screenList = container.componentFactory.createList("screen", container);
        this.log = new LoggerComponent(this.eventHub);
    }

    public getElements(): Element[] {

        // TODO: have component offer a preferred, overridable size and location. E.g list based ones are typically
        // 0,0 and full height
        return [
            new Element(this.log, new Location(9, 0), new Size(3, 12)),
            new Element(this.keyhelpComponent, new Location(0, 0), new Size(12, 4)),
            new Element(this.screenList, new Location(0, 0), new Size(12, 6)),
        ];
    }

    public bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(
                new KeyBinding(["h"],
                "[H]elp"),
        (ch, key) => this.keyhelpComponent.toggleVisibility());

        this.attachKeyHandler(
                new KeyBinding(["l"],
                "[L]og Panel"),
        (ch, key) => this.log.toggleVisibility());

        this.attachKeyHandler(
                new KeyBinding(["s"],
                "[S]creen list"),
        (ch, key) => this.screenList.toggleVisibility());
    }

}
