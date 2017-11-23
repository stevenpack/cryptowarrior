
import * as Blessed from "blessed";
import {Events} from "../events/Events";
import BlessedElement = Blessed.Widgets.BlessedElement;
import {EventEmitter} from "events";
import {Log} from "../Logger";

const logger = Log.getLogger("ComponentBase");

/**
 * Base class for UI components
 */
export abstract class ComponentBase extends EventEmitter {

    // Event subscriptions, used to auto unsubscribe
    protected eventSubscriptionTokens: string[] = [];

    constructor(private eventHub: PubSubJS.Base) {
        super();
    }

    public toggleVisibility(element: BlessedElement) {
        if (element.hidden) {
            element.show();
            element.setFront();
        } else {
            element.hide();
        }
        element.focus();
        this.fireUpdated(true);
    }

    public unload() {
        this.unsubscribeAll();
    }

    public unsubscribeAll() {
        for (const token of this.eventSubscriptionTokens) {
            logger.debug(`Unsubscribe from event ${token}`);
            this.eventHub.unsubscribe(token);
        }
        this.eventSubscriptionTokens = [];
    }

    protected subscribe(event: string, handler: (msg, data) => void) {
        const token = this.eventHub.subscribe(event, handler);
        logger.debug(`Subscribe to event ${event} with ${token}`);
        this.eventSubscriptionTokens.push(token);
    }

    protected publish(event: string, data: any) {
        this.eventHub.publish(event, data);
    }

    protected fireUpdated(force?: boolean) {
        this.eventHub.publish(Events.UIUpdate, force);
    }
}

export interface ILog {
    log(msg: string);
}

export class WidgetOpts {
    constructor(public widgetType: any, public opts: any) {

    }
}

/**
 * A IComponent is the main building block. It contains the display (using Widgets)
 * and the logic to get its data.
 *
 * Components with a size and location are `LayoutElements`
 */
export interface IComponent {

    /**
     * Provide the widget and creation options for the screen to create it.
     */
    getWidgetOpts(opts?: any): WidgetOpts;

    /**
     * Provides the created widget. (note:Could be done as a base class)
     */
    setWidget(widget: any);

    /**
     * Provide the created widget to configure
     */
    configure(widget: any, opts?: any);

    /**
     * Load the (initial) data
     */
    load(opts?: any);

    /**
     * Unload. (unsubscribe etc.)
     */
    unload();
}
