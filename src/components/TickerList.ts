import * as blessed from "blessed";
import { Events } from "../events/events";
import { Component, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {Ticker} from "../types/Ticker";

export class TickerListComponent extends ComponentBase implements Component {
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
        // TODO: Redefine GDax types... prefer to be platform agnostic
        // TODO: This will go to screen, need flag for whether it should rebroadcast to children
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
