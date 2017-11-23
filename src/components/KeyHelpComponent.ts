import * as blessed from "blessed";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {ISource} from "../sources/Interfaces";
import {KeyBinding} from "../layouts/KeyBinding";
import {Events} from "../events/Events";

/**
 * Auto generate keyboard help based on the keybindings added with `Component.attachKeyHandler`
 */
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
        this.list.on("select", this.onSelected.bind(this));
    }

    public onSelected(item: blessed.Widgets.BlessedElement, index: number) {
        this.list.hide();
        // TODO: execute the command selected in the help
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
