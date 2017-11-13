import {PublicClient, WebsocketClient, ProductInfo} from 'gdax';
import * as rp from 'request-promise';
import { RawSource } from './PriceHistorySource';

export class GdaxApi implements RawSource {
    websocketClient: WebsocketClient;
    httpClient: PublicClient;

    constructor() {
       this.httpClient = new PublicClient();
       this.websocketClient = new WebsocketClient(['BTC-USD']);
    }

    public async getData() : Promise<any> {
        return this.getPriceHistory();
    }

    public async getPriceHistory() : Promise<any> {
       return this.httpClient.getProductHistoricRates(null);
    }

    public async getProducts() : Promise<ProductInfo[]> {
        return this.httpClient.getProducts();
    }

    public subscribe(callback) {

        this.websocketClient.on('close', () => { console.log('open') });
        this.websocketClient.on('message', data => { callback(data) });
        this.websocketClient.on('error', err => { console.error(err) });
        this.websocketClient.on('close', () => { console.log('close') });
    }

    public unsubscribe() {
        this.websocketClient.disconnect();
    }

}