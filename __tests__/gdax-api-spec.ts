import { GdaxApi } from "../src/sources/GdaxApi";

describe('GdaxApi', () => {
    it('gets ticker list', async (done) => {
  
        let api = new GdaxApi();
        let products = await api.getProducts();
        expect(products.map(pi => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    })
})  