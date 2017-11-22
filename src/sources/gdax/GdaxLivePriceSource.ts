
import {IStreamingSource} from "../Interfaces";
import {LivePrice} from "../../types/LivePrice";
import {Log} from "../../Logger";

import * as GTT from "gdax-trading-toolkit";
import {OrderbookMessage} from "gdax-trading-toolkit/build/src/core";
import {Logger} from "gdax-trading-toolkit/build/src/utils";
import {GDAXFeed} from "gdax-trading-toolkit/build/src/exchanges";

const logger = Log.getLogger("GdaxLivePriceSource");

// TODO: put into container
class TempLogger implements Logger {
    public log(level: string, message: string, meta?: any): void {
        logger.trace(message);
    }

    public error(err: Error): void {
        logger.error(err.stack);
    }
}

export class GdaxLivePriceSource implements IStreamingSource<LivePrice> {

    private feed: GDAXFeed;
    private subscriptionIdSeed: number = 0;
    private subscriptions = {};

    constructor(private productIds: string[]) {
    }

    public async subscribe(opts: any, callback: (data: LivePrice) => void): Promise<number> {

        if (!this.feed) {
            await this.init();
        }
        const id = this.subscriptionIdSeed++;
        this.subscriptions[id] = callback;
        return id;
    }

    public unsubscribe(subscriptionId) {
        this.subscriptions[subscriptionId] = null;
        delete this.subscriptions[subscriptionId];
    }

    private async init() {
        const tempLogger = new TempLogger();
        try {
            this.feed = await GTT.Factories.GDAX.FeedFactory(tempLogger, this.productIds);
            this.feed.on("data", this.onMessage.bind(this));
        } catch (e) {
            logger.error(e);
        }
    }

    private onMessage(msg: OrderbookMessage) {
        const priceMsg = msg as any;
        if (priceMsg.type === "trade") {
            const livePrice = new LivePrice(msg.productId, priceMsg.price);
            for (let key in this.subscriptions) {
                if (this.subscriptions.hasOwnProperty(key)) {
                    this.subscriptions[key](livePrice);
                }
            }
        } else {
            // logger.trace(`Ignoring message type: ${msg.type}`);
        }
    }
}
