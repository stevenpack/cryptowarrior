import { GdaxPriceHistoryAdapter } from "../src/sources/PriceHistorySource";
import { Candle, PriceHistory } from "../src/types/PriceHistory";


describe('Price History', () => {
  it('history', () => {

    let items = new Array<Candle>();
    items.push(new Candle(100000, 10, 20, 0,0,0));
    let h = new PriceHistory(items);

    expect(true).toBeTruthy();
  }) 
});

describe('Parsed data', () => {
  it('parses', () => {
    let response = '[[1510269120,7110.01,7110.02,7110.01,7110.02,3.489994839999999],[1510269060,7110,7110.01,7110.01,7110,4.042463090000001]]'
    let json = JSON.parse(response);
    // console.log(json);
    // console.log(typeof json);
    // console.log(json[0]);
    // console.log(json[0][0]);

    // console.log("enumerating...");
    // let i = 0;
    // for (let item of json) {
    //   console.log(i);
    //   console.log(item);
    //   i++;
    // }

    //return;

    let adapter = new GdaxPriceHistoryAdapter();
    let priceHistory = adapter.convert(response);

    expect(priceHistory).toBeTruthy();
    expect(priceHistory.Items).toBeTruthy();
    expect(priceHistory.Items.length).toBeGreaterThan(0);

    //console.log(JSON.stringify(priceHistory, null, 2));

    let item1 = priceHistory.Items[0];

    expect(item1.Time).toBe(1510269120);

  })
});