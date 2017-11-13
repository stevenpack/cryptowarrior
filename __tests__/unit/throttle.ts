import {Throttle} from "../../src/events/Throttle";

describe("Throttle", () => {

    it("ctor with ms", (done) => {
        const throttle = new Throttle(100);
        // Should be token at start
        expect(throttle.tryRemoveToken()).toBeTruthy();

        // Less than 100ms later
        expect(throttle.tryRemoveToken()).toBeFalsy();

        setTimeout(() => {
            try {
                expect(throttle.tryRemoveToken()).toBeTruthy();
                done();
            } catch (e) {
                done(e);
            }
        }, 110);
    });

    it("ctor with period", (done) => {
        const throttle = new Throttle(10, "second");

        // burn through the 10
        for (let i = 0; i < 10; i++) {
            expect(throttle.tryRemoveToken()).toBeTruthy();
        }
        // we're out
        expect(throttle.tryRemoveToken()).toBeFalsy();

        // wait a second and try again
        setTimeout(() => {
            try {
                expect(throttle.tryRemoveToken()).toBeTruthy();
                done();
            } catch (e) {
                done(e);
            }
        }, 1010);

        done();
    });
});
