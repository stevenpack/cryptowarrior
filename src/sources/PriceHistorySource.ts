import { PriceHistory, Candle } from "../types/PriceHistory";


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
        try {
            // console.log(typeof data);
            // console.log(JSON.stringify(data).substr(0,20));
            // let json = JSON.parse(data);
            
            let candles = new Array<Candle>();
            for (let item of data) {
                try {
                    //console.log("About to map: " + item);
                    let candle = this.map(item)
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

    public map(item: any) : Candle {
        let time = parseInt(item[0]);
        let low = parseFloat(item[1]);
        let high = parseFloat(item[2]);
        let open = parseFloat(item[3]);
        let close = parseFloat(item[4]);
        let volume = parseFloat(item[5]);

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