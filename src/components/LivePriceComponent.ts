import { Component, WidgetOpts } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";
import { EventEmitter } from "events";

const contrib = require('blessed-contrib');


export class LivePriceComponent extends EventEmitter implements Component {   
    
    lcd: any;
    
    constructor() {
        super();
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,  
            {
                label: "BTC-USD",
                //segmentWidth: 0.05,
                //segmentInterval: 0.11,
                strokeWidth: 1,
                elements: 4,
                display: "0000",
                //elementSpacing: 4,
                //elementPadding: 2
            })
    }

    setWidget(widget: any) {
        this.lcd = widget;
    }

    configure(widget: any, opts?: any) {        
        
    }

    async load(opts?: any) {
        let rawSource = new GdaxApi();
        let callback = data => this.onPriceChanged(data);
        rawSource.subscribe(callback)
    }

    onPriceChanged(data: any) {
        switch (data.type) {
            case "open":
                this.lcd.setDisplay(data.price);
                this.emit("updated");
                break;
        }              
    
    }

}