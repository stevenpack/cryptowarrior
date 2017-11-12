

import { GdaxApi } from './sources/GdaxApi';
import { PriceHistorySource, GdaxPriceHistoryAdapter } from './sources/PriceHistorySource';
import { SingleCurrency } from './layouts/SingleCurrency';
import Container from './Container';
let contrib = require('blessed-contrib');

export class App {
    screen: SingleCurrency;
    
    constructor() {
        
    }   
    
    loadUI() {
        let container = new Container();
        this.screen = new SingleCurrency(container.eventHub);
        this.screen.load();
    }
}
