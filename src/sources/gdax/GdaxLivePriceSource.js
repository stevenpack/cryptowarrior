"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LivePrice_1 = require("../../types/LivePrice");
const Logger_1 = require("../../Logger");
const GTT = require("gdax-trading-toolkit");
const GdaxLogger_1 = require("./GdaxLogger");
const logger = Logger_1.Log.getLogger("GdaxLivePriceSource");
/**
 * Live prices from GDax using gdax-tt
 *
 * Note: converts to LivePrice to enforce interface. Would be simpler to use gdax-tt throughout, given it's purpose is
 * to abstract over multiple exchanges
 */
class GdaxLivePriceSource {
    constructor(productIds) {
        this.productIds = productIds;
        this.subscriptionIdSeed = 0;
        this.subscriptions = {};
    }
    async subscribe(opts, callback) {
        if (!this.feed) {
            await this.init();
        }
        const id = this.subscriptionIdSeed++;
        this.subscriptions[id] = callback;
        return id;
    }
    unsubscribe(subscriptionId) {
        this.subscriptions[subscriptionId] = null;
        delete this.subscriptions[subscriptionId];
    }
    async init() {
        try {
            const gdaxLogger = new GdaxLogger_1.GdaxLogger();
            this.feed = await GTT.Factories.GDAX.FeedFactory(gdaxLogger, this.productIds);
            this.feed.on("data", this.onMessage.bind(this));
        }
        catch (e) {
            logger.error(e);
        }
    }
    onMessage(msg) {
        const priceMsg = msg;
        if (priceMsg.type === "trade") {
            const livePrice = new LivePrice_1.LivePrice(msg.productId, priceMsg.price);
            for (let key in this.subscriptions) {
                if (this.subscriptions.hasOwnProperty(key)) {
                    this.subscriptions[key](livePrice);
                }
            }
        }
        else {
            // logger.trace(`Ignoring message type: ${msg.type}`);
        }
    }
}
exports.GdaxLivePriceSource = GdaxLivePriceSource;
//# sourceMappingURL=GdaxLivePriceSource.js.map