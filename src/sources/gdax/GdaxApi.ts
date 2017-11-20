import {ProductInfo, PublicClient, WebsocketClient} from "gdax";
import {Events} from "../../events/Events";
import {Log} from "../../Logger";

const logger = Log.getLogger("GdaxApi");
export class GdaxApi {
    public websocketClient: WebsocketClient;
    public httpClient: PublicClient;

    constructor(private eventHub) {
       this.httpClient = new PublicClient();
    }

    public async getPriceHistory(opts: {tickerId: string, period: number}): Promise<any> {
        const priceHistoryHttpClient = new PublicClient(opts.tickerId);
        return priceHistoryHttpClient.getProductHistoricRates({granularity: opts.period});
    }

    public async getProducts(): Promise<ProductInfo[]> {
        return this.httpClient.getProducts();
    }

    public subscribe(productIds: string[], callback: (data) => void) {
        // this.unsubscribe();
        logger.info(`Subscribe: ${productIds}`);
        this.websocketClient = new WebsocketClient(productIds);
        this.websocketClient.on("open", () => this.publishEvent("GDAX Websocket: Open"));
        this.websocketClient.on("message", callback);
        this.websocketClient.on("error", (err) => this.publishEvent(`GDAX Websocket: Error (${err})`));
        this.websocketClient.on("close", () => this.publishEvent("GDAX Websocket: Close"));
    }

    public unsubscribe() {
        if (this.websocketClient) {
            this.publishEvent("GDAX Websocket: Unsubscribe");
            this.websocketClient.disconnect();
        }
    }

    private publishEvent(data: string) {
        this.eventHub.publish(Events.LogEvent, data);
    }
}
