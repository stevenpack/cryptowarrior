
import {LayoutBase, LayoutDetails} from "./LayoutBase";
import {Events} from "../events/Events";
import {Log} from "../Logger";

const logger = Log.getLogger("InitLogger");
export class ScreenManager {

    private currentScreenIndex: number = 0;

    constructor(private eventHub: PubSubJS.Base, private screens: LayoutBase[]) {
        this.eventHub.subscribe(Events.ScreenChanged, this.onScreenChanged.bind(this));
    }

    public load(index: number) {
        const screen = this.screens[index];
        logger.info(`Loading screen...`);
        screen.init();
        this.currentScreenIndex = index;
        screen.load()
            .then(() => logger.info("Screen loaded"))
            .catch((err) => logger.error(err));

    }

    private current(): LayoutBase {
        return this.screens[this.currentScreenIndex];
    }

    private unload(index: number) {
        logger.warn("How to unload...");
        const screen = this.current();
        screen.screen.destroy();
    }

    private onScreenChanged(msg, data) {
        // TODO: destroying flickers screen... is there a detach or similar?
        this.unload(this.currentScreenIndex);
        const index = data as number;
        this.load(index);
    }
}
