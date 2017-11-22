import {ProductInfo, PublicClient, WebsocketClient} from "gdax";
import {Events} from "../../events/Events";
import {Log} from "../../Logger";

const logger = Log.getLogger("GdaxApi");
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
