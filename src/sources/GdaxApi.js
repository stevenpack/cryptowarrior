"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gdax_1 = require("gdax");
class GdaxApi {
    constructor() {
        this.httpClient = new gdax_1.PublicClient();
        this.websocketClient = new gdax_1.WebsocketClient(["BTC-USD"]);
    }
    async getData() {
        return this.getPriceHistory();
    }
    async getPriceHistory() {
        return this.httpClient.getProductHistoricRates(null);
    }
    async getProducts() {
        return this.httpClient.getProducts();
    }
    subscribe(callback) {
        this.websocketClient.on("close", () => { console.log("open"); });
        this.websocketClient.on("message", (data) => { callback(data); });
        this.websocketClient.on("error", (err) => { console.error(err); });
        this.websocketClient.on("close", () => { console.log("close"); });
    }
    unsubscribe() {
        this.websocketClient.disconnect();
    }
}
exports.GdaxApi = GdaxApi;
//# sourceMappingURL=GdaxApi.js.map