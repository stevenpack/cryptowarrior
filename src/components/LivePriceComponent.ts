import { Component, WidgetOpts } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";

const contrib = require('blessed-contrib');


export class LivePriceComponent implements Component {   
    
    lcd: any;
    
    constructor() {
        
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

        //TODO: IoC container
        let rawSource = new GdaxApi();
        let adapter = new GdaxPriceHistoryAdapter();
        let priceHistorySource = new PriceHistorySource(rawSource, adapter);
        let priceHistoryData = await priceHistorySource.getData();

     
        this.lcd.setDisplay(priceHistoryData.Items[0].Close);
        this.lcd.setOptions({
          color: 'green',
          //elementPadding: 4
        });        
    }

}