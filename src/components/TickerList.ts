import { Component, WidgetOpts, ComponentBase } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";
import { EventEmitter } from "events";
import * as blessed from 'blessed';
import { Events } from "../events/events";


export class TickerListComponent extends ComponentBase implements Component {   
    products: ProductInfo[];
    list: blessed.Widgets.ListElement;
        
    constructor(eventHub: PubSubJS.Base) {
        super(eventHub)
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Ticker",
                selectedBg: 'green',
                focusable: true,
                hidden: true,
                keys: true,
                mouse: true,
                vi: true
            })
    }

    setWidget(widget: any) {
        this.list = widget;
    }

    configure(widget: any, opts?: any) {        
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }

    onSelected(item: blessed.Widgets.BlessedElement, index: number) {
        let ticker = this.products[index];
        //TODO: Redefine GDax types... prefer to be platform agnostic
        //TODO: This will go to screen, need flag for whether it should rebroadcast to children
        this.eventHub.publish(Events.TickerChanged, {ticker: ticker});
        this.eventHub.publish(Events.LogEvent, "New ticker: " + ticker.id);
        this.list.hide();
    }

    async load(opts?: any) {
        let rawSource = new GdaxApi();
        this.products = await rawSource.getProducts();
        for (let p of this.products) {
            //Works (index.d.ts is wrong)
            this.list.pushItem(p.id);
        }
    }

    public toggleVisibility() {
        if (this.list.hidden) {
            this.list.show();
            this.list.setFront();
        } else {
            this.list.hide();
        }
        this.list.focus();
        this.list.select(0);
        this.eventHub.publish(Events.UIUpdate, null);
    }

}