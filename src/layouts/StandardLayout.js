"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerComponent_1 = require("../components/LoggerComponent");
const LayoutBase_1 = require("./LayoutBase");
const KeyBinding_1 = require("./KeyBinding");
const KeyHelpComponent_1 = require("../components/KeyHelpComponent");
/**
 * Starting point with standard components like logger, keyhelp and screen chooser
 */
class StandardLayout extends LayoutBase_1.LayoutBase {
    constructor(rows, cols, eventHub, container) {
        super(rows, cols, eventHub, container);
        this.keyhelpComponent = new KeyHelpComponent_1.KeyHelpComponent(this.eventHub, this);
        this.screenList = container.componentFactory.createList("screen", container);
        this.log = new LoggerComponent_1.LoggerComponent(this.eventHub);
    }
    getElements() {
        // TODO: have component offer a preferred, overridable size and location. E.g list based ones are typically
        // 0,0 and full height
        return [
            new LayoutBase_1.Element(this.log, new LayoutBase_1.Location(9, 0), new LayoutBase_1.Size(3, 12)),
            new LayoutBase_1.Element(this.keyhelpComponent, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 4)),
            new LayoutBase_1.Element(this.screenList, new LayoutBase_1.Location(0, 0), new LayoutBase_1.Size(12, 6)),
        ];
    }
    bindKeys() {
        super.bindKeys();
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["h"], "[H]elp"), (ch, key) => this.keyhelpComponent.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["l"], "[L]og Panel"), (ch, key) => this.log.toggleVisibility());
        this.attachKeyHandler(new KeyBinding_1.KeyBinding(["s"], "[S]creen list"), (ch, key) => this.screenList.toggleVisibility());
    }
}
exports.StandardLayout = StandardLayout;
//# sourceMappingURL=StandardLayout.js.map