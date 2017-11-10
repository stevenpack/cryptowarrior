

import { GdaxApi } from './sources/GdaxApi';
import { PriceHistorySource, GdaxPriceHistoryAdapter } from './sources/PriceHistorySource';
import { SingleCurrency } from './layouts/SingleCurrency';
let contrib = require('blessed-contrib');

export class App {
    screen: SingleCurrency;
    public priceHistorySource: PriceHistorySource;
    
    constructor() {
        let rawSource = new GdaxApi();
        let adapter = new GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource(rawSource, adapter);
    }   
    
    async get() : Promise<any> {
        let prices = await this.priceHistorySource.getData();
        //console.log(JSON.stringify(prices, null, 2));
        return prices;
    }

    loadUI() {
        this.screen = new SingleCurrency();
    }

    loadData(data) {
        this.screen.load(data);
    }
}
