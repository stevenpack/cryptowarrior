"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: The typedefs are wrong and cause compile errors. Either fix or don't use
const gdax_1 = require("gdax");
const Events_1 = require("../events/Events");
const LivePrice_1 = require("../types/LivePrice");
class GdaxApi {
    constructor(eventHub) {
        this.eventHub = eventHub;
        this.httpClient = new gdax_1.PublicClient();
    }
    async getData(opts) {
        return this.getPriceHistory(opts);
    }
    async getPriceHistory(productIds) {
        return this.httpClient.getProductHistoricRates(productIds);
    }
    async getProducts() {
        return this.httpClient.getProducts();
    }
    subscribe(productIds, callback) {
        this.unsubscribe();
        this.websocketClient = new gdax_1.WebsocketClient(productIds);
        this.websocketClient.on("open", () => this.publishEvent("GDAX Websocket: Open"));
        this.websocketClient.on("message", (data) => this.onMessage(data, callback));
        this.websocketClient.on("error", (err) => this.publishEvent(`GDAX Websocket: Error (${err})`));
        this.websocketClient.on("close", () => this.publishEvent("GDAX Websocket: Close"));
    }
    onMessage(data, callback) {
        switch (data.type) {
            case "open":
                const livePrice = new LivePrice_1.LivePrice(data.id, data.price);
                callback(livePrice);
                break;
        }
    }
    unsubscribe() {
        this.websocketClient.disconnect();
    }
    publishEvent(data) {
        this.eventHub.publish(Events_1.Events.LogEvent, data);
    }
}
exports.GdaxApi = GdaxApi;
//# sourceMappingURL=GdaxApi.js.map