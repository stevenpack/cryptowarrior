"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../events/Events");
const Logger_1 = require("../Logger");
const logger = Logger_1.Log.getLogger("ScreenManager");
class ScreenManager {
    constructor(eventHub, screens) {
        this.eventHub = eventHub;
        this.screens = screens;
        this.currentScreenIndex = 0;
        this.eventHub.subscribe(Events_1.Events.ScreenChanged, this.onScreenChanged.bind(this));
    }
    async load(index) {
        const screen = this.screens[index];
        logger.info(`Loading screen...`);
        screen.init();
        this.currentScreenIndex = index;
        try {
            await screen.load();
            logger.info("Screen loaded");
        }
        catch (e) {
            logger.error(e);
        }
    }
    current() {
        return this.screens[this.currentScreenIndex];
    }
    async unload(index) {
        const screen = this.current();
        await screen.unload();
    }
    async onScreenChanged(msg, data) {
        const layoutDetails = data;
        logger.info(`New screen selected. ${layoutDetails.index}/${layoutDetails.name}`);
        if (layoutDetails.index === this.currentScreenIndex) {
            logger.info(`Screen selection ignored. Already on screen ${layoutDetails.name}`);
            return;
        }
        await this.unload(this.currentScreenIndex);
        await this.load(layoutDetails.index);
    }
}
exports.ScreenManager = ScreenManager;
//# sourceMappingURL=ScreenManager.js.map