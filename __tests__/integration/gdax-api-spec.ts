

import {GdaxApi} from "../../src/sources/gdax/GdaxApi";
import {Period} from "../../src/types/Period";

describe("GdaxApi", () => {
    const api = new GdaxApi();

    it("gets ticker list", async (done) => {
        const products = await api.getProducts();
        expect(products.map((pi) => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    });

    it("gets price data", async (done) => {
        try {
            const data = await api.getPriceHistory({tickerId: "BTC-USD", period: Period.Day});
            expect(data).toBeTruthy();
            done();
        } catch (e) {
            done(e);
        }
    });
});
