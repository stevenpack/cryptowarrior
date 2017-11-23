

import {ISource, IStreamingSource} from "../Interfaces";
import {PriceHistory} from "../../types/PriceHistory";
import {GdaxPriceHistoryAdapter} from "../gdax/GdaxPriceHistorySource";
import {LivePrice} from "../../types/LivePrice";
import {Ticker} from "../../types/Ticker";

/**
 * Test the UI on a plane!
 */
export class MockPriceHistorySource implements ISource<PriceHistory> {

    public getData(opts: any): Promise<PriceHistory> {
        const raw = [
            [1510269120, 7110.01, 7110.02, 7110.01, 7110.02, 3.489994839999999],
            [1510269060, 7110, 7110.01, 7110.01, 7110, 4.042463090000001],
            [1510269060, 7120, 7120.01, 7120.01, 7120, 4.042463090000001],
            [1510269060, 7130, 7130.01, 7130.01, 7130, 4.042463090000001],
            [1510269060, 7410, 7410.01, 7410.01, 7410, 4.042463090000001],
            [1510269060, 7510, 7510.01, 7510.01, 7510, 4.042463090000001],
        ];
        const adapter = new GdaxPriceHistoryAdapter();
        const priceHistory = adapter.convert(raw);
        return Promise.resolve(priceHistory);
    }
}

export class MockLivePriceSource implements IStreamingSource<LivePrice> {

    private stopped = false;

    public subscribe(opts: any, callback: (data: LivePrice) => void): Promise<number> {
        this.stopped = false;
        this.delayAndPublish(callback, 6500, 300, 50);
        return Promise.resolve(1);
    }

    public unsubscribe(subscriptionId: number) {
        this.stopped = true;
    }

    private delayAndPublish(callback: (data: LivePrice) => void, btcPrice, ethPrice, ltcPrice) {
        setTimeout(() => {
            if (this.stopped) {
                return;
            }
            callback(new LivePrice("BTC-USD", btcPrice));
            callback(new LivePrice("ETH-USD", ethPrice));
            callback(new LivePrice("LTC-USD", ltcPrice));
            this.delayAndPublish(callback, btcPrice + .1, ethPrice + .1, ltcPrice + .01);
        }, 100);
    }
}

export class MockTickerSource implements ISource<Ticker[]> {

    public getData(opts: any): Promise<Ticker[]> {
        return Promise.resolve(["BTC-USD", "LTC-USD", "BTC-EUR", "LTC-EUR"].map((id) => new Ticker(id)));
    }
}
