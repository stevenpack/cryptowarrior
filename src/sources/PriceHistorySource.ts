import { PriceHistory, Candle } from "../types/PriceHistory";
import {IAdapter, IDataSource, ISource} from "./Interfaces";



export class GdaxPriceHistoryAdapter implements IAdapter<PriceHistory> {
    public convert(data: any): PriceHistory {
        try {
            const candles = [];
            for (const item of data) {
                try {
                    // console.log("About to map: " + item);
                    const candle = this.map(item);
                    candles.push(candle);
                } catch (e) {
                    console.error("Ignored bad candle.");
                    console.error(e);
                    console.error(item);
                }
            }
            return new PriceHistory(candles);
        } catch (e) {
            console.error(e);

        }
    }

    public map(item: any): Candle {
        const time = parseInt(item[0]);
        const low = parseFloat(item[1]);
        const high = parseFloat(item[2]);
        const open = parseFloat(item[3]);
        const close = parseFloat(item[4]);
        const volume = parseFloat(item[5]);

        return new Candle(time, low, high, open, close, volume);
    }
}

export class PriceHistorySource implements ISource<PriceHistory> {

    constructor(private rawSource: IDataSource, private adapter: IAdapter<PriceHistory>) {
    }

    public async getData(opts): Promise<PriceHistory> {
        const data = await this.rawSource.getData(opts);
        const priceHistory = this.adapter.convert(data);
        return priceHistory;
    }
}
