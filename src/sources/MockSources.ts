
import {IDataSource, ISource, IStreamingSource} from "./Interfaces";
import {Ticker} from "../types/Ticker";
import {PriceHistory} from "../types/PriceHistory";
import {GdaxPriceHistoryAdapter} from "./PriceHistorySource";

export class MockPriceHistorySource implements ISource<PriceHistory[]> {

    public getData(opts: any): Promise<PriceHistory> {
        const raw = [
            [1510269120, 7110.01, 7110.02, 7110.01, 7110.02, 3.489994839999999],
            [1510269060, 7110, 7110.01, 7110.01, 7110, 4.042463090000001],
        ];
        const adapter = new GdaxPriceHistoryAdapter();
        const priceHistory = adapter.convert(raw);
        return Promise.resolve(priceHistory);
    }
}

// todo: IStreamingSource<Price>
export class MockLivePriceSource implements IStreamingSource {

    public subscribe(opts: any, callback: (data: any) => void) {
        this.delayAndPublish(callback, 6500);
    }

    private delayAndPublish(callback, price) {
        setTimeout(() => {
            callback({type: "open", price});
            this.delayAndPublish(callback, price + 1);
        }, 1000);
    }
}

export class MockTickerSource implements ISource<Ticker[]> {

    public getData(opts: any): Promise<Ticker[]> {
        return Promise.resolve(["BTC-USD", "LTC-USD", "BTC-EUR", "LTC-EUR"].map((id) => new Ticker(id)));
    }
}
