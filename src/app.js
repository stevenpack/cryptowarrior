"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blessed = require("blessed");
var contrib = require('blessed-contrib');
var Test = /** @class */ (function () {
    function Test() {
        var screen = blessed.screen({});
        //create layout and widgets
        var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
        var line = contrib.line({ style: { line: "yellow",
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
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=app.js.map