import * as PubSub from "pubsub-js";
import {GdaxApi} from "./sources/GdaxApi";
import {GdaxPriceHistoryAdapter, PriceHistorySource} from "./sources/PriceHistorySource";
import {PriceHistory} from "./types/PriceHistory";
import {IAdapter, IDataSource, ISource, IStreamingSource} from "./sources/Interfaces";
import {RawTestApi} from "./sources/RawTestApi";

export default class Container {

    public eventHub: PubSubJS.Base;
    public priceHistorySource: ISource<PriceHistory>;
    public gdaxApi: IDataSource;
    public gdaxPriceHistoryAdapter: IAdapter<PriceHistory>;
    public livePriceSource: IStreamingSource;

    constructor() {
        this.eventHub = PubSub;

        this.gdaxApi = new GdaxApi(this.eventHub);
        const testApi = new RawTestApi();
        this.gdaxPriceHistoryAdapter = new GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource(testApi, this.gdaxPriceHistoryAdapter);
        this.livePriceSource = new RawTestApi();

    }
}
