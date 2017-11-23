import {ProductInfo, PublicClient} from "gdax";
import {Log} from "../../Logger";

const logger = Log.getLogger("GdaxApi");
/**
 * Wrapper for the GDAX REST API use gdax-node project. Streaming is handled by `GdaxLivePriceSource`
 *
 * note: Could migrate most api methods to gdax-tt snapshots, although price history isn't currently available
 */
export class GdaxApi {
    public httpClient: PublicClient;

    constructor() {
       this.httpClient = new PublicClient();
    }

    public async getPriceHistory(opts: {tickerId: string, period: number}): Promise<any> {
        const priceHistoryHttpClient = new PublicClient(opts.tickerId);
        return priceHistoryHttpClient.getProductHistoricRates({granularity: opts.period});
    }

    public async getProducts(): Promise<ProductInfo[]> {
        return this.httpClient.getProducts();
    }
}
