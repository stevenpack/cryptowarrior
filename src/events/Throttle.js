"use strict";
/**
 * Created by steve on 13/11/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimiter = require("limiter").RateLimiter;
/**
 * Simple throttle tracking per period actions using tokens;
 */
class Throttle {
    /**
     * E.g. 10, 'second' for 10 per second or 100 for once per 100ms
     * @param num
     * @param period
     */
    constructor(num, period) {
        if (period) {
            this.limiter = new RateLimiter(num, period);
        }
        else {
            this.limiter = new RateLimiter(1, num);
        }
    }
    /**
     * Test to see if there are tokens available. Returns true if yes.
     *
     * @returns {boolean}
     */
    tryRemoveToken() {
        return this.limiter.tryRemoveTokens(1);
    }
}
exports.Throttle = Throttle;
//# sourceMappingURL=Throttle.js.map