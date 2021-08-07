import config from './config.json';
import { App } from "./App";

//We call this line of code once
const app = new App(config.BOT_TOKEN);
app.listenToServerMessages()
