"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
let app = new App_1.App();
app.loadUI();
app.get()
    .then(data => {
    //console.log(data);
    app.screen.load(data);
    console.log("Done");
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map