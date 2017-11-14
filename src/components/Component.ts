
import * as Blessed from "blessed";
import {Events} from "../events/Events";
import BlessedElement = Blessed.Widgets.BlessedElement;

export abstract class ComponentBase {

    constructor(public eventHub: PubSubJS.Base) {}

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
}
