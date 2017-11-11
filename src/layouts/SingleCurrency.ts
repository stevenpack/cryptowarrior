import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { LayoutBase, Element, Location, Size } from './LayoutBase';
import { TickerListComponent } from '../components/TickerList';

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    tickerList: TickerListComponent;
    
    constructor() {
        super(12, 12);
    }

    addElements() {
        this.tickerList = new TickerListComponent();
        this.elements.push(new Element(this.tickerList, new Location(0,0), new Size(12,2)))
        this.elements.push(new Element(new PriceHistoryComponent(), new Location(1,1), new Size(8,4)));
        this.elements.push(new Element(new LivePriceComponent(), new Location(1,6), new Size(2,4)));
    }

    bindKeys() {
        super.bindKeys();
        this.screen.key(['t'], (ch, key) => {
            this.tickerList.toggleVisibility();
            this.screen.render();
        })
    }
}