import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { LayoutBase, Element, Location, Size } from './LayoutBase';
import { TickerListComponent } from '../components/TickerList';
import { LoggerComponent } from '../components/LoggerComponent'
/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    logger: LoggerComponent;
    tickerList: TickerListComponent;
    
    constructor() {
        super(12, 12);
    }

    addElements() {
        this.tickerList = new TickerListComponent();
        this.logger = new LoggerComponent();
        this.elements.push(new Element(this.logger, new Location(9,0), new Size(3,12)));
        this.elements.push(new Element(this.tickerList, new Location(0,0), new Size(12,2)))
        this.elements.push(new Element(new PriceHistoryComponent(), new Location(2,8), new Size(8,4)));
        this.elements.push(new Element(new LivePriceComponent(), new Location(0,8), new Size(2,4)));
    }

    bindKeys() {
        super.bindKeys();
        this.screen.key(['t'], (ch, key) => {
            this.tickerList.toggleVisibility();            
        })
        this.screen.key(['l'], (ch, key) => {
            this.logger.toggleVisibility();            
        })
    }
}