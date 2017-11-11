import * as blessed from 'blessed';
import {Component} from '../components/Component';
import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { EventEmitter } from 'events';
const contrib = require('blessed-contrib')

export abstract class LayoutBase {
    
    screen: blessed.Widgets.Screen;
    grid: any;    
    components: Array<Component>;
    locations: Array<any>;

    constructor(rows: Number, cols: Number) {
        this.screen = blessed.screen({})
        this.grid = new contrib.grid({rows: rows, cols: cols, screen: this.screen})         
        
        this.components = [];
        this.locations = [];

        //todo: check javascript spec re: calling abstract from constructor
        this.init();
    }

    abstract addComponents();

    init() {
        this.addComponents();
        this.build();
        this.listen();
        this.bindKeys();
    }

    build() {
        for (let i=0; i < this.components.length; i++) {
            let component = this.components[i];
            let loc = this.locations[i];
            //Create
            let widgetOpts = component.getWidgetOpts();
            
            //TODO: store position with the component
            let widget = this.grid.set(loc[0],loc[1],loc[2],loc[3], widgetOpts.widgetType, widgetOpts.opts);

            //Store reference
            component.setWidget(widget);

            //Configure
            component.configure(widget);
        }        
    }

    listen() {
        for (let component of this.components) {
            //TODO: throttle updates to once per interval e.g. 100ms
            if (component instanceof EventEmitter) {
                component.on("updated", () => this.screen.render())
            }
        }
    }

    bindKeys() {
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });        
    }

    public async load() {
        for (let component of this.components) {
            await component.load();
        }
        this.screen.render();
    }
}

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    
    constructor() {
        super(12, 12);
    }

    addComponents() {
        this.components.push(new PriceHistoryComponent());
        this.locations.push([1,1,8,4]);
        this.components.push(new LivePriceComponent());
        this.locations.push([1,6,2,4]);
    }
}