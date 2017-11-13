import * as blessed from "blessed";
import {ProductInfo} from "gdax";
import { Events } from "../events/events";
import { GdaxApi } from "../sources/GdaxApi";
import { Component, ComponentBase, WidgetOpts } from "./Component";

export class TickerListComponent extends ComponentBase implements Component {
    public products: ProductInfo[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base) {
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
        const ticker = this.products[index];
        // TODO: Redefine GDax types... prefer to be platform agnostic
        // TODO: This will go to screen, need flag for whether it should rebroadcast to children
        this.eventHub.publish(Events.TickerChanged, {ticker});
        this.eventHub.publish(Events.LogEvent, "New ticker: " + ticker.id);
        this.list.hide();
    }

    public async load(opts?: any) {
        const rawSource = new GdaxApi();
        this.products = await rawSource.getProducts();
        for (const p of this.products) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(p.id);
        }
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }

}
