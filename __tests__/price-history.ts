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
    let adapter = new GdaxPriceHistoryAdapter();
    let priceHistory = adapter.convert(json);

    expect(priceHistory).toBeTruthy();
    expect(priceHistory.Items).toBeTruthy();
    expect(priceHistory.Items.length).toBeGreaterThan(0);

    console.log(priceHistory.Items[0]);
    
    let item1 = priceHistory.Items[0];
    expect(item1.Time).toEqual(1510269120);  
  })
});