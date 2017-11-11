import * as blessed from 'blessed';
import {Component} from '../components/Component';
import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { EventEmitter } from 'events';
const contrib = require('blessed-contrib')

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency {
    screen: blessed.Widgets.Screen;
    components: Array<Component>;
    locations: Array<any>;
    table: any;

    constructor() {
        this.screen = blessed.screen({})
        this.components = [];
        this.locations = [];
        //create layout and widgets
        //upgrade_todo: ScreenBuilder with components and sources
        let grid = new contrib.grid({rows: 12, cols: 12, screen: this.screen})         
        
        this.components.push(new PriceHistoryComponent());
        this.locations.push([1,1,8,4]);
        this.components.push(new LivePriceComponent());
        this.locations.push([1,6,2,4]);

        for (let i=0; i < this.components.length; i++) {
            let component = this.components[i];
            let loc = this.locations[i];
            //Create
            let widgetOpts = component.getWidgetOpts();
            //TODO: store position with the component
            let widget = grid.set(loc[0],loc[1],loc[2],loc[3], widgetOpts.widgetType, widgetOpts.opts);

            //Store reference
            component.setWidget(widget);

            //Configure
            component.configure(widget);

            //TODO: throttle updates to once per interval e.g. 100ms
            if (component instanceof EventEmitter) {
                component.on("updated", () => this.screen.render())
            }
        }
                    
        //TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });
        
        this.screen.render()
    }

    public async load() {
        for (let component of this.components) {
            await component.load();
        }
        this.screen.render();
    }
}