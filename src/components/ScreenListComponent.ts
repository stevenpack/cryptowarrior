import * as blessed from "blessed";
import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {Ticker} from "../types/Ticker";
import {LayoutBase, LayoutDetails} from "../layouts/LayoutBase";

export class ScreenListComponent extends ComponentBase implements IComponent {
    public screens: LayoutDetails[];
    public list: blessed.Widgets.ListElement;

    // TODO: accept the index/name/descrip, not the whole screen
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
        this.eventHub.publish(Events.ScreenChanged, index);
        this.eventHub.publish(Events.LogEvent, "New Screen: " + this.screens[index].name);
    }

    public async load(opts?: any) {
        this.list.clearItems();
        this.screens = await this.source.getData(null);
        for (const s of this.screens) {
            // Works (index.d.ts is wrong)
            this.list.pushItem(`${s.index + 1}. ${s.name}`);
        }
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
