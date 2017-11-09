const app = require('../src/app.js');

test('gets 1', () => {
  let testable = new app.Testable();
  expect(testable.a()).toBe(1);
});
