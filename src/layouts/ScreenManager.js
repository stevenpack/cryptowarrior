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
        const screen = this.current();
        screen.unload();
    }
    onScreenChanged(msg, data) {
        // TODO: destroying flickers screen... is there a detach or similar?
        const index = data;
        if (index === this.currentScreenIndex) {
            logger.info(`Screen selection ignored. Already on screen ${index}`);
            return;
        }
        this.unload(this.currentScreenIndex);
        this.load(index);
    }
}
exports.ScreenManager = ScreenManager;
//# sourceMappingURL=ScreenManager.js.map