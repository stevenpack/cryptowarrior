import * as blessed from 'blessed';
const contrib = require('blessed-contrib')

import { Component } from '../components/Component';
import { EventEmitter } from 'events';

export class Location {
    constructor (public x: Number, public y: Number) {}
}

export class Size {
    constructor (public rows: Number, public cols: Number) {}
}

/**
 * An `Element` is composed of a `Component`, `Location` and `Size` to make up
 * part of a `LayoutBase`
 */
export class Element {
    constructor (public component: Component, public location: Location, public size: Size) {}
}

export abstract class LayoutBase {
    
    protected screen: blessed.Widgets.Screen;
    grid: any;    
    elements: Array<Element>;

    constructor(rows: Number, cols: Number) {
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
                element.component.on("updated", () => this.screen.render())
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