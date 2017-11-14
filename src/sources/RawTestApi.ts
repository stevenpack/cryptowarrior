
import {IDataSource, IStreamingSource} from "./Interfaces";

export class RawTestApi implements IDataSource, IStreamingSource {

    public getData(opts: any): Promise<any> {
        return Promise.resolve([
            [1510269120, 7110.01, 7110.02, 7110.01, 7110.02, 3.489994839999999],
            [1510269060, 7110, 7110.01, 7110.01, 7110, 4.042463090000001],
        ]);
    }

    public subscribe(opts: any, callback: (data: any) => void) {
        this.delayAndPublish(callback, 6500);
    }

    private delayAndPublish(callback, price) {
        setTimeout(() => {
            callback({type: "open", price: price});
            this.delayAndPublish(callback, price + 1);
        }, 1000);
    }
}
