
import {LayoutBase} from "./LayoutBase";
import {Events} from "../events/Events";
import {Log} from "../Logger";

const logger = Log.getLogger("ScreenManager");
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
        const screen = this.current();
        screen.unload();
    }

    private onScreenChanged(msg, data) {
        // TODO: destroying flickers screen... is there a detach or similar?
        const index = data as number;
        if (index === this.currentScreenIndex) {
            logger.info(`Screen selection ignored. Already on screen ${index}`);
            return;
        }
        this.unload(this.currentScreenIndex);
        this.load(index);
    }
}
