"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
const Logger_1 = require("../Logger");
const logger = Logger_1.Log.getLogger("InitLogger");
class ScreenManager {
    constructor(eventHub, screens) {
        this.eventHub = eventHub;
        this.screens = screens;
        this.currentScreenIndex = 0;
        this.eventHub.subscribe(Events_1.Events.ScreenChanged, this.onScreenChanged.bind(this));
    }
    load(index) {
        const screen = this.screens[index];
        logger.info(`Loading screen...`);
        screen.init();
        this.currentScreenIndex = index;
        screen.load()
            .then(() => logger.info("Screen loaded"))
            .catch((err) => logger.error(err));
    }
    current() {
        return this.screens[this.currentScreenIndex];
    }
    unload(index) {
        logger.warn("How to unload...");
        const screen = this.current();
        screen.screen.destroy();
    }
    onScreenChanged(msg, data) {
        // TODO: destroying flickers screen... is there a detach or similar?
        this.unload(this.currentScreenIndex);
        const index = data;
        this.load(index);
    }
}
exports.ScreenManager = ScreenManager;
//# sourceMappingURL=ScreenManager.js.map