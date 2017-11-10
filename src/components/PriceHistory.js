"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriceHistory {
    constructor(Items) {
        this.Items = Items;
    }
}
exports.PriceHistory = PriceHistory;
class Candle {
    constructor(Time, Low, High, Open, Close, Volume) {
        this.Time = Time;
        this.Low = Low;
        this.High = High;
        this.Open = Open;
        this.Close = Close;
        this.Volume = Volume;
    }
}
exports.Candle = Candle;
//# sourceMappingURL=PriceHistory.js.map