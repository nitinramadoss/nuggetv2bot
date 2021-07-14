import config from './config.json';
import { App } from "./App";

const app = new App(config.BOT_TOKEN);
app.listenToServerMessages()
