import {IAdapter, ISource} from "./Interfaces";
import {Ticker} from "../types/Ticker";
import {GdaxApi} from "./GdaxApi";

export class GdaxTickerSource implements ISource<Ticker[]> {

    constructor(private api: GdaxApi, private adapter?: IAdapter<Ticker>) {
    }

    public async getData(opts): Promise<Ticker[]> {
        const data = await this.api.getProducts();
        return data.map(p => new Ticker(p.id));
    }
}
