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
                hidden: true
            })
    }

    setWidget(widget: any) {
        this.logger = widget;
    }

    configure(widget: any, opts?: any) {        
        this.logger.key('up', (ch,key) => {
            this.logger.top -= 1
            this.logger.height += + 1;
        })
        this.logger.key('down', (ch,key) => {
            this.logger.top += 1
            this.logger.height -= + 1;
        })
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
        //this.logger.select(0);q
        this.emit("updated");
    }
}