
import {IStreamingSource} from "../Interfaces";
import {LivePrice} from "../../types/LivePrice";
import {GdaxApi} from "./GdaxApi";

export class GdaxLivePriceSource implements IStreamingSource<LivePrice> {

    constructor(private productIds, private api: GdaxApi) {
    }

    public subscribe(opts: any, callback: (data: LivePrice) => void) {
        const productIds = opts as string[] || this.productIds;
        this.api.subscribe(productIds, (data) => this.onMessage(callback, data));
    }

    public unsubscribe() {
        this.api.unsubscribe();
    }

    private onMessage(callback: (livePrice: LivePrice) => void, data: any) {
        switch (data.type) {
            case "open":
                const livePrice = new LivePrice(data.product_id, data.price);
                callback(livePrice);
                break;
        }
    }
}
