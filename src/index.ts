import { App } from "./App";


let app = new App();
app.get()
    .then(data => console.log("Done"))
    .catch(err => console.error(err));