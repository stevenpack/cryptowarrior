import {PriceHistory, Candle} from '../components/PriceHistory';

export interface RawSource {
    getData() : Promise<any>
}

interface Source<T> {
    getData() : Promise<T>
}
interface Adapter<T> {
    convert(data: any) : T;
}

export class GdaxPriceHistoryAdapter implements Adapter<PriceHistory> {
    public convert(data: any) : PriceHistory {

        let json = JSON.parse(data);

        let candles = new Array<Candle>(json.length);
        for (let item of json) {
            try {
                let candle = this.map(item)
                candles.push(candle);
            } catch (e) {
                console.error("Ignored bad candle.");
                console.error(item);
            }            
        }
        return new PriceHistory(candles);
    }

    public map(item: any) : Candle {
        let time = parseInt(item[0]);
        let low = parseInt(item[1]);
        let high = parseInt(item[2]);
        let open = parseInt(item[3]);
        let close = parseInt(item[4]);
        let volume = parseInt(item[5]);

        return new Candle(time, low, high, open, close, volume);
    }
}

export class PriceHistorySource implements Source<PriceHistory> {

    constructor(private rawSource: RawSource, private adapter: Adapter<PriceHistory>) {

    }

    public async getData() : Promise<PriceHistory> {

        let data = await this.rawSource.getData();
        let priceHistory = this.adapter.convert(data);
        return priceHistory
    }

}