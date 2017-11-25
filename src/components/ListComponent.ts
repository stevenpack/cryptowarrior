import * as blessed from "blessed";
import { Events } from "../events/Events";
import { IComponent, ComponentBase, WidgetOpts } from "./Component";
import {EnumEx} from "../types/EnumEx";
import {Period} from "../types/Period";
import {Log} from "../Logger";
import {ISource} from "../sources/Interfaces";

const logger = Log.getLogger("ListComponent");
/**
 * Generalized List to display and raise selection event for some type T.
 *
 * Well known types creatable through `ComponentFactory.createList`
 */
export class ListComponent<T> extends ComponentBase implements IComponent {
    public items: T[];
    public list: blessed.Widgets.ListElement;

    constructor(eventHub: PubSubJS.Base,
                private label: string,
                private source: ISource<T[]>,
                private event: string,
                private fnDisplay?: (T) => string) {
        super(eventHub);
    }

    public getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(blessed.list,
            {
                label: this.label,
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
        const selectedItem = this.items[index];
        this.publish(this.event, selectedItem);
        this.publish(Events.LogEvent, `New Selection: ${this.format(selectedItem)}`);
        this.list.hide();
    }

    public async load(opts?: any) {
        this.list.clearItems();
        this.items = await this.source.getData(opts);
        for (const item of this.items) {
            const display = this.format(item);
            this.list.pushItem(display);
        }
    }

    public unload() {
        super.unload();
        this.list.removeAllListeners("select");
    }

    public toggleVisibility() {
        super.toggleVisibility(this.list);
    }

    private format(item: any) {
        return this.fnDisplay ? this.fnDisplay(item) : item;
    }
}
