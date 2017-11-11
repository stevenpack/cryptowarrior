import { GdaxApi } from "../src/sources/GdaxApi";

describe('GdaxApi', () => {
    let api = new GdaxApi();

    it('gets ticker list', async (done) => {       
        let products = await api.getProducts();
        expect(products.map(pi => pi.id).includes("BTC-USD")).toBeTruthy();
        done();
    })


    it('gets', async (done) => {
        try {
            let data = await api.getPriceHistory();
            expect(data).toBeTruthy();  
            done();    
        } catch (e) {
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
    }
    api.subscribe(callback);
  })
})  