"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GdaxApi_1 = require("../src/sources/GdaxApi");
describe('GdaxApi', () => {
    it('gets ticker list', async (done) => {
        let api = new GdaxApi_1.GdaxApi();
        let products = await api.getProducts();
        expect(products.map(pi => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    });
});
//# sourceMappingURL=gdax-api-spec.js.map