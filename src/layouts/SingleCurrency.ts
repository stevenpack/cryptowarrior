import * as blessed from 'blessed';
import {Component} from '../components/Component';
import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
const contrib = require('blessed-contrib')

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency {
    screen: blessed.Widgets.Screen;
    components: Array<Component>
    table: any;

    constructor() {
        this.screen = blessed.screen({})
        this.components = [];
        //create layout and widgets
        //upgrade_todo: ScreenBuilder with components and sources
        let grid = new contrib.grid({rows: 12, cols: 12, screen: this.screen})         
        let priceHistory = new PriceHistoryComponent();
        this.components.push(priceHistory);

        for (let component of this.components) {
            
            //Create
            let widgetOpts = component.getWidgetOpts();
            //TODO: store position with the component
            let widget = grid.set(1,1,8,4, widgetOpts.widgetType, widgetOpts.opts);

            //Store reference
            component.setWidget(widget);

            //Configure
            component.configure(widget);
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