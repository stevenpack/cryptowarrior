

import { GdaxApi } from './sources/GdaxApi';
import { PriceHistorySource, GdaxPriceHistoryAdapter } from './sources/PriceHistorySource';
import { SingleCurrency } from './layouts/SingleCurrency';
let contrib = require('blessed-contrib');

export class App {
    screen: SingleCurrency;
    
    constructor() {
        
    }   
    
    loadUI() {
        this.screen = new SingleCurrency();
        this.screen.load();
    }
}
