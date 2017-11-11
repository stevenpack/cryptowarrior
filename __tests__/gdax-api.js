const gdaxApi = require('../src/sources/GdaxApi');

const api = new gdaxApi.GdaxApi();

test('gets', () => {
  try {
    
    api.getPriceHistory()
      .then(data => {
        let json = JSON.parse(data);
        //console.log(JSON.stringify(json[0]));
        expect(data).toBeTruthy();  
      })
      .catch(e => {
        console.error(e);        
      })

  } catch (e) {
    console.error(e);
  }
});

test('subscribes', done => {

  let callback = (data) => {
    //console.log("GOT TYPE: " + data.type);
    //console.log(data);
    //console.log("GOT DATA: " + JSON.stringify(data, null, 2));
    //let msg = JSON.parse(data);
    switch (data.type) {
      case "open":
        console.log("got open: " + data.price);
        done();
        break;
    }    
  }
  api.subscribe(callback);
})