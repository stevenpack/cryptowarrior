import * as rp from 'request-promise';
import { RawSource } from './PriceHistorySource';

export class GdaxApi implements RawSource {

    constructor() {

    }

    public async getData() : Promise<any> {
        return this.getPriceHistory();
    }

    public async getPriceHistory() : Promise<any> {
        return rp('https://api.gdax.com/products/BTC-USD/candles', {
            headers: {
                'User-Agent': 'packfinance'
            }
        });
    }

}