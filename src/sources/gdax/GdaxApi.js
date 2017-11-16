"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: The typedefs are wrong and cause compile errors. Either fix or don't use
const gdax_1 = require("gdax");
const Events_1 = require("../../events/Events");
class GdaxApi {
    constructor(eventHub) {
        this.eventHub = eventHub;
        this.httpClient = new gdax_1.PublicClient();
    }
    async getPriceHistory(opts) {
        const priceHistoryHttpClient = new gdax_1.PublicClient(opts.tickerId);
        return priceHistoryHttpClient.getProductHistoricRates({ granularity: opts.period });
    }
    async getProducts() {
        return this.httpClient.getProducts();
    }
    subscribe(productIds, callback) {
        this.unsubscribe();
        this.websocketClient = new gdax_1.WebsocketClient(productIds);
        this.websocketClient.on("open", () => this.publishEvent("GDAX Websocket: Open"));
        this.websocketClient.on("message", callback);
        this.websocketClient.on("error", (err) => this.publishEvent(`GDAX Websocket: Error (${err})`));
        this.websocketClient.on("close", () => this.publishEvent("GDAX Websocket: Close"));
    }
    unsubscribe() {
        if (this.websocketClient) {
            this.websocketClient.disconnect();
        }
    }
    publishEvent(data) {
        this.eventHub.publish(Events_1.Events.LogEvent, data);
    }
}
exports.GdaxApi = GdaxApi;
//# sourceMappingURL=GdaxApi.js.map