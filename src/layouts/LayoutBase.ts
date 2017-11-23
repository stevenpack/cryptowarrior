import * as blessed from "blessed";
const contrib = require("blessed-contrib");

import { IComponent, ILog } from "../components/Component";
import { Events } from "../events/Events";
import {Throttle} from "../events/Throttle";
import Container from "../Container";
import {KeyBinding} from "./KeyBinding";
import {ISource} from "../sources/Interfaces";

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

export class LayoutDetails {
    constructor(
        public index: number,
        public name: string,
        public description: string,
    ) {}
}

/**
 * Base class for all Layouts.
 *
 * Responsible for building its components and making sure everything is subscribed and unsubscribed.
 */
export abstract class LayoutBase implements ISource<KeyBinding[]>{
    private screen: blessed.Widgets.Screen;
    private elements: Element[];
    private grid: any;
    private logger: ILog;
    private uiThrottle: Throttle;
    private renderCount = 0;
    private keybindings: KeyBinding[];
    private eventSubscriptionTokens: string[];

    constructor(private rows: number, private cols: number, protected eventHub, protected container: Container) {
        this.elements = [];
        this.uiThrottle = new Throttle(200);
    }

    public abstract getElements(): Element[];

    public init() {
        this.screen = blessed.screen({});
        this.grid = new contrib.grid({rows: this.rows, cols: this.cols, screen: this.screen});
        this.keybindings = [];
        this.eventSubscriptionTokens = [];
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

            // Apply theme
            // widgetOpts.opts.fg = "green";
            // widgetOpts.opts.bg = "black";
            const widget = this.grid.set(loc.x, loc.y, size.rows, size.cols , widgetOpts.widgetType, widgetOpts.opts);

            // Store reference (because we are creating the actual instance, not the component)
            component.setWidget(widget);

            // Configure
            component.configure(widget);
        }
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

    public async unload() {
        for (const element of this.elements) {
            try {
                await element.component.unload();
            } catch (e) {
                this.logger.log(`Failed to unload component ${element.component}. Error: ${e.message}`);
            }
        }
        this.elements = [];
        this.unsubscribeEvents();
        this.unbindKeys();
        this.screen.destroy();
    }

    public getData(opts: any): Promise<KeyBinding[]> {
        return Promise.resolve(this.keybindings);
    }

    protected subscribeEvents() {
        this.subscribe(Events.UIUpdate, this.onUIUpdate.bind(this));
        this.subscribe(Events.LogEvent, this.onLogEvent.bind(this));
    }

    protected subscribe(event: string, handler: (msg, data) => void) {
        const token = this.eventHub.subscribe(event, handler);
        this.eventSubscriptionTokens.push(token);
    }

    protected unsubscribeEvents() {
        for (const token of this.eventSubscriptionTokens) {
            this.eventHub.unsubscribe(token);
        }
    }

    protected bindKeys() {
        this.attachKeyHandler(new KeyBinding(["q", "C-c"], "[Q]uit"), (ch, key) => {
            return process.exit(0);
        });
    }

    protected unbindKeys() {
        for (const kb of this.keybindings) {
            this.screen.removeKey(kb.keys);
        }
    }

    protected attachKeyHandler(keybinding: KeyBinding, handler: (ch, key) => void) {
        this.keybindings.push(keybinding);
        this.screen.key(keybinding.keys, (ch, key) => handler(ch, key));
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
