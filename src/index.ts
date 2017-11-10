import { App } from "./App";


let app = new App();
app.loadUI();
app.get()
    .then(data => {
        //console.log(data);
        app.screen.load(data);
        console.log("Done");
    })
    .catch(err => console.error(err));
