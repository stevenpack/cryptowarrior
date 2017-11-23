import * as blessed from "blessed";
import { IComponent, ComponentBase, ILog, WidgetOpts } from "./Component";

/**
 * Logger panel visible in the UI.
 *
 * Growable/shrinkable with up/down arros
 */
export class LoggerComponent extends ComponentBase implements IComponent, ILog {

    public logger: blessed.Widgets.Log;

    constructor(eventHub: PubSubJS.Base) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.log,
            {
                label: "Log",
                hidden: true,
            });
    }

    public setWidget(widget: any) {
        this.logger = widget;
    }

    public configure(widget: any, opts?: any) {
        this.bindKeys();
    }

    public bindKeys() {
        this.logger.key("up", (ch, key) => {
            this.logger.top -= 1;
            this.logger.height += + 1;
        });
        this.logger.key("down", (ch, key) => {
            this.logger.top += 1;
            this.logger.height -= + 1;
        });
    }

    public unload() {
        super.unload();
        this.logger.removeKey("up");
        this.logger.removeKey("down");
    }

    public toggleVisibility() {
        super.toggleVisibility(this.logger);
    }

    public async load(opts?: any) {
    }

    public log(msg: string) {
        this.logger.log(msg);
    }
}
