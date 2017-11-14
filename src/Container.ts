import * as PubSub from "pubsub-js";
import {GdaxApi} from "./sources/GdaxApi";
import {GdaxPriceHistoryAdapter, PriceHistorySource} from "./sources/PriceHistorySource";
import {PriceHistory} from "./types/PriceHistory";
import {IAdapter, IDataSource, ISource, IStreamingSource} from "./sources/Interfaces";
import {MockLivePriceSource, MockPriceHistorySource, MockTickerSource} from "./sources/MockSources";
import {Ticker} from "./types/Ticker";
import {GdaxTickerSource} from "./sources/TickerSource";

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

    public livePriceSource: IStreamingSource;
    public priceHistorySource: ISource<PriceHistory>;
    public tickerSource: ISource<Ticker[]>;

    constructor() {
        this.eventHub = PubSub;

        this.gdaxApi = new GdaxApi(this.eventHub);
        this.gdaxPriceHistoryAdapter = new GdaxPriceHistoryAdapter();

        this.initMock();
    }

    initGdax() {
        this.priceHistorySource = new PriceHistorySource(this.gdaxApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = this.gdaxApi;
        this.tickerSource = new GdaxTickerSource(this.gdaxApi);
    }

    initMock() {
        this.priceHistorySource = new MockPriceHistorySource();
        this.livePriceSource = new MockLivePriceSource();
        this.tickerSource = new MockTickerSource();
    }
}
