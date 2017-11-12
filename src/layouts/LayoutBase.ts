import * as blessed from 'blessed';
const contrib = require('blessed-contrib')

import { Component, ILog } from '../components/Component';
import { EventEmitter } from 'events';
import { Events } from '../events/events';

export class Location {
    constructor (public x: number, public y: number) {}
}

export class Size {
    constructor (public rows: number, public cols: number) {}
}

/**
 * An `Element` is composed of a `Component`, `Location` and `Size` to make up
 * part of a `LayoutBase`
 */
export class Element {
    constructor (public component: Component, public location: Location, public size: Size) {}
}

export abstract class LayoutBase {    
    private grid: any;
    private logger: ILog;

    protected screen: blessed.Widgets.Screen;    
    protected elements: Array<Element>;

    constructor(rows: number, cols: number) {
        this.screen = blessed.screen({})
        this.grid = new contrib.grid({rows: rows, cols: cols, screen: this.screen})         
        
        this.elements = [];

        //todo: check javascript spec re: calling abstract from constructor
        this.init();
    }

    abstract addElements();

    init() {
        this.addElements();
        this.build();
        //Render the elements as soon as they're ready
        this.screen.render();                
        this.listen();
        this.bindKeys();
        this.setLogger();
    }

    build() {
        for (let element of this.elements) {
            let component = element.component;
            let loc = element.location;
            let size = element.size;
            
            //Create
            let widgetOpts = component.getWidgetOpts();            
            let widget = this.grid.set(loc.x, loc.y, size.rows, size.cols , widgetOpts.widgetType, widgetOpts.opts);

            //Store reference (because we are creating the actual instance, not the component)
            component.setWidget(widget);

            //Configure
            component.configure(widget);
        }        
    }

    listen() {
        for (let element of this.elements) {
            //TODO: throttle updates to once per interval e.g. 100ms
            if (element.component instanceof EventEmitter) {
                element.component.on(Events.UIUpdate, () => this.screen.render())
                element.component.on(Events.LogEvent, (msg) => {
                   if (this.logger) {
                       this.logger.log(msg);
                   }
                })
            }
        }
    }

    setLogger(): any {
        for (let e of this.elements) {
            if ((e.component as ILog).log != undefined) {
                this.logger = e.component;
                break;
            }

        }
    }

    protected bindKeys() {
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });        
    }

    public async load() {
        for (let element of this.elements) {
            await element.component.load();
        }
        this.screen.render();
    }
}