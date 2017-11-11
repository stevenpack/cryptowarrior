import { Component, WidgetOpts } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";
import { EventEmitter } from "events";
import * as blessed from 'blessed';
const contrib = require('blessed-contrib');


export class LoggerComponent extends EventEmitter implements Component {   
    
    logger: blessed.Widgets.Log;
    
    constructor() {
        super()
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.log,  
            {
                label: "Log",
                
            })
    }

    setWidget(widget: any) {
        this.logger = widget;
    }

    configure(widget: any, opts?: any) {        
        
    }

    async load(opts?: any) {
        this.logger.log("Logger created");
    }

    //TODO: common component
    public toggleVisibility() {
        if (this.logger.hidden) {
            this.logger.show();
            this.logger.setFront();
        } else {
            this.logger.hide();
        }
        this.logger.focus();
        //this.logger.select(0);
        this.emit("updated");
    }
}