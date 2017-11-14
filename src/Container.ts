import * as PubSub from "pubsub-js";
import {PriceHistory} from "./types/PriceHistory";
import {IAdapter, IDataSource, ISource, IStreamingSource} from "./sources/Interfaces";
import {Ticker} from "./types/Ticker";
import {GdaxApi} from "./sources/gdax/GdaxApi";
import {GdaxPriceHistoryAdapter, GdaxPriceHistorySource} from "./sources/gdax/GdaxPriceHistorySource";
import {GdaxTickerSource} from "./sources/gdax/GdaxTickerSource";
import {MockLivePriceSource, MockPriceHistorySource, MockTickerSource} from "./sources/mock/MockSources";
import {LivePrice} from "./types/LivePrice";
import {GdaxLivePriceSource} from "./sources/gdax/GdaxLivePriceSource";

/**
 * IoC Container
 *
 * Note: Would love to use the Angular style one where $args are auto-injected. Don't love the existing
 *       solutions on npm
 */
export default class Container {

    public eventHub: PubSubJS.Base;
    public gdaxApi: GdaxApi;
    public gdaxPriceHistoryAdapter: IAdapter<PriceHistory>;

    public livePriceSource: IStreamingSource<LivePrice>;
    public priceHistorySource: ISource<PriceHistory>;
    public tickerSource: ISource<Ticker[]>;

    constructor() {
        this.eventHub = PubSub;

        this.gdaxApi = new GdaxApi(this.eventHub);
        this.gdaxPriceHistoryAdapter = new GdaxPriceHistoryAdapter();
        this.initMock();
    }

    private initGdax() {
        this.priceHistorySource = new GdaxPriceHistorySource(this.gdaxApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = new GdaxLivePriceSource(this.gdaxApi);
        this.tickerSource = new GdaxTickerSource(this.gdaxApi);
    }

    private initMock() {
        this.priceHistorySource = new MockPriceHistorySource();
        this.livePriceSource = new MockLivePriceSource();
        this.tickerSource = new MockTickerSource();
    }
}
