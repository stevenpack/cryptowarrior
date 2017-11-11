import { Component, WidgetOpts } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";
import { EventEmitter } from "events";
import * as blessed from 'blessed';


export class TickerListComponent implements Component {   
    list: blessed.Widgets.ListElement;
        
    constructor() {
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Ticker",
                hidden: true
            })
    }

    setWidget(widget: any) {
        this.list = widget;
    }

    configure(widget: any, opts?: any) {        
        
    }

    async load(opts?: any) {
        let rawSource = new GdaxApi();
        let products = await rawSource.getProducts();
        for (let p of products) {
            this.list.pushLine(p.id);
        }
    }

    public toggleVisibility() {
        if (this.list.hidden) {
            this.list.show();
            this.list.setFront();
        } else {
            this.list.hide();
        }
    }

}