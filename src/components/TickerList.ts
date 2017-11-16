import * as blessed from "blessed";
import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {Ticker} from "../types/Ticker";

export class TickerListComponent extends ComponentBase implements IComponent {
    public tickers: Ticker[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base, private source: ISource<Ticker[]>) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Ticker",
                selectedBg: "green",
                focusable: true,
                hidden: true,
                keys: true,
                mouse: true,
                vi: true,
            });
    }

    public setWidget(widget: any) {
        this.list = widget;
    }

    public configure(widget: any, opts?: any) {
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }

    public onSelected(item: blessed.Widgets.BlessedElement, index: number) {
        const ticker = this.tickers[index];
        this.eventHub.publish(Events.TickerChanged, ticker);
        this.eventHub.publish(Events.LogEvent, "New ticker: " + ticker.id);
        this.list.hide();
    }

    public async load(opts?: any) {
        this.tickers = await this.source.getData(null);
        for (const t of this.tickers) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(t.id);
        }
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
