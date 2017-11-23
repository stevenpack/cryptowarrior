"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxApi_1 = require("../../src/sources/gdax/GdaxApi");
const Period_1 = require("../../src/types/Period");
describe("GdaxApi", () => {
    const api = new GdaxApi_1.GdaxApi();
    it("gets ticker list", async (done) => {
        const products = await api.getProducts();
        expect(products.map((pi) => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    });
    it("gets price data", async (done) => {
        try {
            const data = await api.getPriceHistory({ tickerId: "BTC-USD", period: Period_1.Period.Day });
            expect(data).toBeTruthy();
            done();
        }
        catch (e) {
            done(e);
        }
    });
});
//# sourceMappingURL=gdax-api-spec.js.map