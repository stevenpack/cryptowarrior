import * as blessed from "blessed";
const contrib = require("blessed-contrib");

import { IComponent, ILog, ComponentBase } from "../components/Component";
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
 * An `Element` is composed of a `IComponent`, `Location` and `Size` to make up
 * part of a `LayoutBase`
 */
export class Element {
    constructor(public component: IComponent, public location: Location, public size: Size) {}
}

export abstract class LayoutBase {
    private screen: blessed.Widgets.Screen;
    private elements: Element[];
    private grid: any;
    private logger: ILog;
    private uiThrottle: Throttle;
    private renderCount = 0;

    constructor(rows: number, cols: number, protected eventHub, protected container: Container) {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({rows, cols, screen: this.screen});
        this.elements = [];
        this.uiThrottle = new Throttle(200);
    }

    public abstract getElements(): Element[];

    public init() {
        const elements = this.getElements();
        this.elements.push.apply(this.elements, elements);
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
        this.eventHub.subscribe(Events.UIUpdate, this.onUIUpdate.bind(this));
        this.eventHub.subscribe(Events.LogEvent, this.onLogEvent.bind(this));
    }

    public async load() {
        this.preLoad();
        for (const element of this.elements) {
            try {
                await element.component.load();
            } catch (e) {
                this.logger.log(`Failed to load component ${element.component}. Error: ${e.message}`);
            }
        }
        this.postLoad();
        this.screen.render();
    }

    protected bindKeys() {
        this.screen.key(["q", "C-c"], (ch, key) => {
            return process.exit(0);
        });
    }

    protected attachKeyHandler(keys: string[], handler: (ch, key) => void) {
        this.screen.key(keys, (ch, key) => handler(ch, key));
    }

    protected preLoad() {
        /* Optionally overridden by inheritor */
    }

    protected postLoad() {
        /* Optionally overridden by inheritor */
    }

    private onUIUpdate(msg, data) {
        const force = data as boolean;
        // Restrict UI updates to maximum of x/sec (see this.uiThrottle)
        if (force || this.uiThrottle.tryRemoveToken()) {
            this.renderCount++;
            if (this.renderCount % 100 === 0) {
                this.onLogEvent(null, `+100 screen render calls (total: ${this.renderCount})`);
            }
            this.screen.render();
        }
    }

    private onLogEvent(msg, data) {
        if (this.logger) {
            this.logger.log(data);
        }
    }

    private setLogger(): any {
        for (const e of this.elements) {
            if (this.isLogger(e)) {
                const component: any = e.component;
                this.logger = component as ILog;
                break;
            }
        }
    }

    private isLogger(element: any): boolean {
        return element.component.log !== undefined;
    }
}
