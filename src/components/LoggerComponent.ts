import { Component, WidgetOpts, ILog, ComponentBase } from "./Component";
import * as blessed from 'blessed';
import { Events } from "../events/events";
const contrib = require('blessed-contrib');



export class LoggerComponent extends ComponentBase implements Component, ILog {   
    
    logger: blessed.Widgets.Log;
    
    constructor(eventHub: PubSubJS.Base) {
        super(eventHub)
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
            this.logger.top -= 1;
            this.logger.height += + 1;
        });
        this.logger.key('down', (ch,key) => {
            this.logger.top += 1;
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
        this.eventHub.publish(Events.UIUpdate, null);
    }

    log(msg: string) {
        this.logger.log(msg);
    }
}