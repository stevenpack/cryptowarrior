import * as blessed from "blessed";
import { Component, ComponentBase, ILog, WidgetOpts } from "./Component";

export class LoggerComponent extends ComponentBase implements Component, ILog {

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
        this.logger.key("up", (ch, key) => {
            this.logger.top -= 1;
            this.logger.height += + 1;
        });
        this.logger.key("down", (ch, key) => {
            this.logger.top += 1;
            this.logger.height -= + 1;
        });
    }

    public toggleVisibility() {
        super.toggleVisibility(this.logger);
    }

    public async load(opts?: any) {
        this.logger.log("Logger created");
    }

    public log(msg: string) {
        this.logger.log(msg);
    }
}
