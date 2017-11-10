"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const GdaxApi_1 = require("./sources/GdaxApi");
const PriceHistorySource_1 = require("./sources/PriceHistorySource");
let contrib = require('blessed-contrib');
class App {
    constructor() {
        let rawSource = new GdaxApi_1.GdaxApi();
        let adapter = new PriceHistorySource_1.GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource_1.PriceHistorySource(rawSource, adapter);
    }
    async get() {
        let prices = await this.priceHistorySource.getData();
        console.log(JSON.stringify(prices, null, 2));
    }
}
exports.App = App;
class Test {
    constructor() {
        let screen = blessed.screen({});
        //create layout and widgets
        let grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
        let line = contrib.line({ style: { line: "yellow",
                text: "green",
                baseline: "black" },
            xLabelPadding: 3,
            xPadding: 5,
            label: 'Title' }), data = {
            x: ['t1', 't2', 't3', 't4'],
            y: [5, 1, 7, 5]
        };
        screen.append(line); //must append before setting data 
        line.setData([data]);
        screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });
        screen.render();
    }
}
exports.Test = Test;
//# sourceMappingURL=App.js.map