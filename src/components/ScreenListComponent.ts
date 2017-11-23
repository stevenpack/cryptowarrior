import * as blessed from "blessed";
import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {LayoutDetails} from "../layouts/LayoutBase";

/**
 * Auto generated screen list based on LayoutDatails.
 *
 * Fires ScreenChanged, which ScreenManager listens to to switch screens in and out
 */
export class ScreenListComponent extends ComponentBase implements IComponent {
    public screens: LayoutDetails[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base, private source: ISource<LayoutDetails[]>) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Screens",
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
        this.list.hide();
        this.publish(Events.ScreenChanged, index);
        this.publish(Events.LogEvent, "New Screen: " + this.screens[index].name);
    }

    public async load(opts?: any) {
        this.list.clearItems();
        this.screens = await this.source.getData(null);
        for (const s of this.screens) {
            this.list.pushItem(`${s.index + 1}. ${s.name}`);
        }
    }

    public unload() {
        super.unload();
        this.list.removeAllListeners("select");
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
