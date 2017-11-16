"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Javascript {
    static isIterable(obj) {
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }
}
exports.Javascript = Javascript;
//# sourceMappingURL=Javascript.js.map