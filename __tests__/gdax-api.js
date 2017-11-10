const gdaxApi = require('../src/sources/GdaxApi');

test('gets', () => {
  try {
    let api = new gdaxApi.GdaxApi();
    api.getPriceHistory()
      .then(data => {
        let json = JSON.parse(data);
        console.log(JSON.stringify(json[0]));
        expect(data).toBeTruthy();  
      })
      .catch(e => {
        console.error(e);
        expect.fail(e);
      })

  } catch (e) {
    console.error(e);
  }
});
