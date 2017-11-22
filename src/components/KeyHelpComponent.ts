import * as blessed from "blessed";
import { Events } from "../events/events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {Ticker} from "../types/Ticker";
import {LayoutBase, LayoutDetails} from "../layouts/LayoutBase";
import {KeyBinding} from "../layouts/KeyBinding";

export class KeyHelpComponent extends ComponentBase implements IComponent {
    public keybindings: KeyBinding[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base, private source: ISource<KeyBinding[]>) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: "Keys",
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
    }

    public async load(opts?: any) {
        this.list.clearItems();
        this.keybindings = await this.source.getData(null);
        const sorted = this.keybindings.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
        for (const k of sorted) {
            this.list.pushItem(`${k.keys}. ${k.description}`);
        }
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
