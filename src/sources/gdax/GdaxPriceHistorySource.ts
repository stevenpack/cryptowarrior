import {GdaxApi} from "./GdaxApi";
import {IAdapter, ISource} from "../Interfaces";
import {Candle, PriceHistory} from "../../types/PriceHistory";

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

export class GdaxPriceHistorySource implements ISource<PriceHistory> {

    constructor(private api: GdaxApi, private adapter: IAdapter<PriceHistory>) {
    }

    public async getData(opts): Promise<PriceHistory> {
        const data = await this.api.getPriceHistory(opts);
        const priceHistory = this.adapter.convert(data);
        return priceHistory;
    }
}
