import {GdaxApi} from "./GdaxApi";
import {IAdapter, ISource} from "../Interfaces";
import {Candle, PriceHistory} from "../../types/PriceHistory";
import {Javascript} from "../../util/Javascript";
import {Log} from "../../Logger";

const logger = Log.getLogger("GdaxPriceHistoryAdapter");

/**
 * Converts from Gdax rows to `Candle` type
 */
export class GdaxPriceHistoryAdapter implements IAdapter<PriceHistory> {
    public convert(data: any): PriceHistory {
        try {
            const candles = [];
            if (Javascript.isIterable(data)) {
                for (const item of data) {
                    try {
                        const candle = this.map(item);
                        candles.push(candle);
                    } catch (e) {
                        logger.error(`Ignored bad candle. ${e} ${item}`);
                    }
                }
            }
            return new PriceHistory(candles);
        } catch (e) {
            logger.error(`Failed to convert GDAX data to PriceHistory. Error: ${e}`);

        }
    }

    public map(item: any): Candle {
        const time = parseInt(item[0], 10);
        const low = parseFloat(item[1]);
        const high = parseFloat(item[2]);
        const open = parseFloat(item[3]);
        const close = parseFloat(item[4]);
        const volume = parseFloat(item[5]);

        return new Candle(time, low, high, open, close, volume);
    }
}

/**
 * Source of `PriceHistory` data, combining the GDaxApi and Adapter
 */
export class GdaxPriceHistorySource implements ISource<PriceHistory> {

    constructor(private api: GdaxApi, private adapter: IAdapter<PriceHistory>) {
    }

    public async getData(opts): Promise<PriceHistory> {
        const data = await this.api.getPriceHistory(opts);
        const priceHistory = this.adapter.convert(data);
        return priceHistory;
    }
}
