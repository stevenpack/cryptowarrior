import { Component, WidgetOpts, ComponentBase } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { PriceHistorySource, GdaxPriceHistoryAdapter } from "../sources/PriceHistorySource";

const contrib = require('blessed-contrib');


export class PriceHistoryComponent extends ComponentBase implements Component {   
    
    headers: string[];    
    table: any;
    
    constructor(eventHub) {
        super(eventHub)
        this.headers = ['Time', 'Low', 'High', 'Open', 'Close'];
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.table,  
            {
                keys: true, 
                fg: 'green',
                label: 'Price History',
                columnSpacing: 1,
                columnWidth: [12, 10, 10, 10, 10]
            })
    }

    setWidget(widget: any) {
        this.table = widget;
    }

    configure(widget: any, opts?: any) {        
        widget.setData({headers: this.headers, data: []});
    }

    async load(opts?: any) {

        //TODO: IoC container
        let rawSource = new GdaxApi();
        let adapter = new GdaxPriceHistoryAdapter();
        let priceHistorySource = new PriceHistorySource(rawSource, adapter);
        let priceHistoryData = await priceHistorySource.getData();

        //The table takes data as an array per row
        let table_data = [];
        for (let candle of priceHistoryData.Items) {
            table_data.push([candle.Time, candle.Low, candle.High, candle.Open, candle.Close]);
        }
        console.log("loaded");
        this.table.setData({headers: this.headers, data: table_data});

        this.eventHub.publish("test", "yo");
    }

}