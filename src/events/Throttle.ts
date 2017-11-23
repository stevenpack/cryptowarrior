/**
 * Created by steve on 13/11/17.
 */

const RateLimiter = require("limiter").RateLimiter;

/**
 * Simple throttle tracking per period actions using tokens;
 */
export class Throttle {

    private limiter;

    /**
     * E.g. 10, 'second' for 10 per second or 100 for once per 100ms
     * @param num
     * @param period
     */
    constructor(num: number, period?: string) {
        if (period) {
            this.limiter = new RateLimiter(num, period);
        } else {
            this.limiter = new RateLimiter(1, num);
        }

    }

    /**
     * Test to see if there are tokens available. Returns true if yes.
     *
     * @returns {boolean}
     */
    public tryRemoveToken(): boolean {
        return this.limiter.tryRemoveTokens(1);
    }
}
