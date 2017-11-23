"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Period;
(function (Period) {
    // Second = 1,
    Period[Period["Minute"] = 60] = "Minute";
    Period[Period["Hour"] = 3600] = "Hour";
    Period[Period["Day"] = 86400] = "Day";
    Period[Period["Week"] = 604800] = "Week";
    // Month = 365 * Day / 12,
    // Year = 365 * Day
})(Period = exports.Period || (exports.Period = {}));
//# sourceMappingURL=Period.js.map