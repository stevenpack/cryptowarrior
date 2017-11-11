"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxApi_1 = require("../src/sources/GdaxApi");
describe('GdaxApi', () => {
    let api = new GdaxApi_1.GdaxApi();
    it('gets ticker list', async (done) => {
        let products = await api.getProducts();
        expect(products.map(pi => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    });
    it('gets', async (done) => {
        try {
            let data = await api.getPriceHistory();
            expect(data).toBeTruthy();
            done();
        }
        catch (e) {
            console.error(e);
            done(e);
        }
    });
    it('subscribes', done => {
        let callback = (data) => {
            switch (data.type) {
                case "open":
                    console.log("got open: " + data.price);
                    done();
                    break;
            }
        };
        api.subscribe(callback);
    });
});
//# sourceMappingURL=gdax-api-spec.js.map