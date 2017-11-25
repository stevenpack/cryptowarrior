
import {ListComponent} from "./ListComponent";
import {ISource} from "../sources/Interfaces";
import {Events} from "../events/Events";
import Container from "../Container";
import {Ticker} from "../types/Ticker";

export class ComponentFactory {

    constructor(private eventHub: PubSubJS.Base) {
    }

    public createList<T>(type: string, container: Container): any {
        switch (type.toLowerCase()) {
            case "ticker":
                return this.createListComponent<Ticker>(
                    "Ticker",
                    container.tickerSource,
                    Events.TickerChanged,
                (ticker) => ticker.id);
            case "period":
                return this.createListComponent<T>(
                    "Period",
                    container.periodSource,
                    Events.PeriodChanged,
                    (period) => period);
            case "screen":
                return this.createListComponent<T>(
                    "Screen",
                    container.screenInventory,
                    Events.ScreenChanged,
                    (layoutDetails) => `${layoutDetails.index + 1}. ${layoutDetails.name}`);
            default:
                throw new Error(`Unknown list component ${type}`);
        }
    }

    private createListComponent<T>(
        label: string,
        source: ISource<T[]>,
        event: string,
        fnDisplay?: (T) => string): ListComponent<T> {

        return new ListComponent<T>(
            this.eventHub,
            label,
            source,
            event,
            fnDisplay);
    }
}
