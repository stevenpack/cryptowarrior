import {Component} from '../components/Component';
import { PriceHistoryComponent } from '../components/PriceHistoryComponent';
import { LivePriceComponent } from '../components/LivePriceComponent';
import { EventEmitter } from 'events';
import { LayoutBase, Element, Location, Size } from './LayoutBase';

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency extends LayoutBase {
    
    constructor() {
        super(12, 12);
    }

    addElements() {
        this.elements.push(new Element(new PriceHistoryComponent(), new Location(1,1), new Size(8,4)));
        this.elements.push(new Element(new LivePriceComponent(), new Location(1,6), new Size(2,4)));
    }
}