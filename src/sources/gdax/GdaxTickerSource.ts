import {GdaxApi} from "./GdaxApi";
import {Ticker} from "../../types/Ticker";
import {ISource} from "../Interfaces";

export class GdaxTickerSource implements ISource<Ticker[]> {

    constructor(private api: GdaxApi) {
    }

    public async getData(opts): Promise<Ticker[]> {
        const data = await this.api.getProducts();
        return data.map(p => new Ticker(p.id));
    }
}
