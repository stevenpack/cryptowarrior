import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { LayoutBase, Element, Location, Size } from './LayoutBase';
import { TickerListComponent } from '../components/TickerList';
import { LoggerComponent } from '../components/LoggerComponent'
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    log: LoggerComponent;
    tickerList: TickerListComponent;
    
    constructor(eventHub: PubSubJS.Base) {
        super(12, 12, eventHub);
    }

    addElements() {
        this.tickerList = new TickerListComponent(this.eventHub);
        this.log = new LoggerComponent(this.eventHub);
        this.elements.push(new Element(this.log, new Location(9,0), new Size(3,12)));
        this.elements.push(new Element(this.tickerList, new Location(0,0), new Size(12,2)))
        this.elements.push(new Element(new PriceHistoryComponent(this.eventHub), new Location(2,8), new Size(10,4)));
        this.elements.push(new Element(new LivePriceComponent(this.eventHub), new Location(0,8), new Size(2,4)));
    }

    bindKeys() {
        super.bindKeys();
        this.screen.key(['t'], (ch, key) => {
            this.tickerList.toggleVisibility();            
        })
        this.screen.key(['l'], (ch, key) => {
            this.log.toggleVisibility();            
        })
    }
}