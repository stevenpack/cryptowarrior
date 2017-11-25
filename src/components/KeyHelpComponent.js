"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const Component_1 = require("./Component");
/**
 * Auto generate keyboard help based on the keybindings added with `Component.attachKeyHandler`
 */
class KeyHelpComponent extends Component_1.ComponentBase {
    constructor(eventHub, source) {
        super(eventHub);
        this.source = source;
    }
    getWidgetOpts(opts) {
        return new Component_1.WidgetOpts(blessed.list, {
            label: "Keys",
            selectedBg: "green",
            focusable: true,
            hidden: true,
            keys: true,
            mouse: true,
            vi: true,
        });
    }
    setWidget(widget) {
        this.list = widget;
    }
    configure(widget, opts) {
        this.list.on("select", this.onSelected.bind(this));
    }
    onSelected(item, index) {
        this.list.hide();
        // TODO: execute the command selected in the help
    }
    async load(opts) {
        this.list.clearItems();
        this.keybindings = await this.source.getData(null);
        const sorted = this.keybindings.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
        for (const k of sorted) {
            this.list.pushItem(`${k.description}`);
        }
    }
    toggleVisibility() {
        super.toggleVisibility(this.list);
    }
}
exports.KeyHelpComponent = KeyHelpComponent;
//# sourceMappingURL=KeyHelpComponent.js.map