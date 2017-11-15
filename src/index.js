"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {});
const app = new App_1.App(argv);
app.loadUI();
//# sourceMappingURL=index.js.map