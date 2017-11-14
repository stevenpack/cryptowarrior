"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RawTestApi {
    getData(opts) {
        return Promise.resolve([
            [1510269120, 7110.01, 7110.02, 7110.01, 7110.02, 3.489994839999999],
            [1510269060, 7110, 7110.01, 7110.01, 7110, 4.042463090000001],
        ]);
    }
    subscribe(opts, callback) {
        this.delayAndPublish(callback, 6500);
    }
    delayAndPublish(callback, price) {
        setTimeout(() => {
            callback({ type: "open", price: price });
            this.delayAndPublish(callback, price + 1);
        }, 1000);
    }
}
exports.RawTestApi = RawTestApi;
//# sourceMappingURL=RawTestApi.js.map