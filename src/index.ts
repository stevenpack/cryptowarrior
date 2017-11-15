import { App } from "./App";

const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {});
const app = new App(argv);
app.loadUI();
