
export class WidgetOpts {
    constructor(public widgetType: any, public opts: any) {

    }
}

export interface ILog {
    log(msg: string);
}

/**
 * A Component is the main building block. It contains the display (using Widgets)
 * and the logic to get its data.
 * 
 * Components with a size and location are `LayoutElements`
 */
export interface Component {
    
    /**
     * Provide the widget and creation options for the screen to create it.
     */
    getWidgetOpts(opts?: any) : WidgetOpts;

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

    //update()
}
