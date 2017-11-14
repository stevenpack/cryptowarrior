import * as blessed from "blessed";
const contrib = require("blessed-contrib");

import { Component, ILog, ComponentBase } from "../components/Component";
import { Events } from "../events/events";
import {Throttle} from "../events/Throttle";
import Container from "../Container";

export class Location {
    constructor(public x: number, public y: number) {}
}

export class Size {
    constructor(public rows: number, public cols: number) {}
}

/**
 * An `Element` is composed of a `Component`, `Location` and `Size` to make up
 * part of a `LayoutBase`
 */
export class Element {
    constructor(public component: Component, public location: Location, public size: Size) {}
}

export abstract class LayoutBase {
    protected screen: blessed.Widgets.Screen;
    protected elements: Element[];

    private grid: any;
    private logger: ILog;
    private uiThrottle: Throttle;
    private renderCount = 0;

    constructor(rows: number, cols: number, protected eventHub, protected container: Container) {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({rows, cols, screen: this.screen})     ;
        this.elements = [];
        this.uiThrottle = new Throttle(200);
        // todo: check javascript spec re: calling abstract from constructor
        this.init();
    }

    public abstract addElements();

    public init() {
        this.addElements();
        this.build();
        // Render the elements as soon as they're ready
        this.screen.render();
        this.subscribeEvents();
        this.bindKeys();
        this.setLogger();
    }

    public build() {
        for (const element of this.elements) {
            const component = element.component;
            const loc = element.location;
            const size = element.size;

            // Create
            const widgetOpts = component.getWidgetOpts();
            const widget = this.grid.set(loc.x, loc.y, size.rows, size.cols , widgetOpts.widgetType, widgetOpts.opts);

            // Store reference (because we are creating the actual instance, not the component)
            component.setWidget(widget);

            // Configure
            component.configure(widget);
        }
    }

    public subscribeEvents() {
        for (const element of this.elements) {
            // TODO: throttle updates to once per interval e.g. 100ms
            if (element.component instanceof ComponentBase) {
                element.component.eventHub.subscribe(Events.UIUpdate, (msg, data) => {
                    if (this.uiThrottle.tryRemoveToken()) {
                        this.renderCount++;
                        if (this.renderCount % 100 === 0) {
                            this.onLogEvent(null, `+100 renders (${this.renderCount})`);
                        }
                        this.screen.render();
                    }
                });
                if (this.isLogger(element)) {
                    element.component.eventHub.subscribe(Events.LogEvent, (msg, data) => this.onLogEvent(msg, data));
                }
            }
        }
    }

    public onLogEvent(msg, data) {
        if (this.logger) {
            this.logger.log(data);
        }
    }

    public setLogger(): any {
        for (const e of this.elements) {
            if (this.isLogger(e)) {
                this.logger = e.component;
                break;
            }
        }
    }

    public isLogger(element: Element): boolean {
        return (element.component as ILog).log != undefined;
    }

    protected bindKeys() {
        // TODO: base screen with standard shortcuts and per-screen ones
        this.screen.key(["escape", "q", "C-c"], (ch, key) => {
            return process.exit(0);
        });
    }

    public async load() {
        for (const element of this.elements) {
            await element.component.load();
        }
        this.screen.render();
    }
}
