"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxApi_1 = require("../../src/sources/GdaxApi");
describe("GdaxApi", () => {
    const api = new GdaxApi_1.GdaxApi();
    it("gets ticker list", async (done) => {
        const products = await api.getProducts();
        expect(products.map((pi) => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    });
    it("gets", async (done) => {
        try {
            const data = await api.getPriceHistory();
            expect(data).toBeTruthy();
            done();
        }
        catch (e) {
            done(e);
        }
    });
    it("subscribes", (done) => {
        const callback = (data) => {
            switch (data.type) {
                case "open":
                    // console.log("got open: " + data.price);
                    api.unsubscribe();
                    done();
                    break;
            }
        };
        api.subscribe(callback);
    });
});
//# sourceMappingURL=gdax-api-spec.js.map