import * as blessed from "blessed";
import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {EnumEx} from "../types/EnumEx";
import {Period} from "../types/Period";

/**
 * Component to choose a time period (Second, Minute, Hourly, Daily, Weekly etc.)
 *
 * Could be generalized ListPickerbase
 */
export class PeriodListComponent extends ComponentBase implements IComponent {
    public periods: string[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Time Period",
                selectedBg: "green",
                focusable: true,
                hidden: true,
                keys: true,
                mouse: true,
                vi: true,
            });
    }

    public setWidget(widget: any) {
        this.list = widget;
    }

    public configure(widget: any, opts?: any) {
        this.list.on("select", (item, i) => this.onSelected(item, i));
    }

    public onSelected(item: blessed.Widgets.BlessedElement, index: number) {
        const period = this.periods[index];
        this.eventHub.publish(Events.PeriodChanged, Period[period]);
        this.eventHub.publish(Events.LogEvent, `New Period: ${period} (${Period[period]} secs)`);
        this.list.hide();
    }

    public async load(opts?: any) {
        this.list.clearItems();
        this.periods = EnumEx.getNames(Period);
        for (const p of this.periods) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(p);
        }
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }

}
