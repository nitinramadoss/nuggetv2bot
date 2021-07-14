import config from '../config.json';
import { Client as DiscordClient} from "discord.js";
import { MessageHandler } from "./messageHandler";

const client = new DiscordClient();
const messageHandler = new MessageHandler(client);

function listenToServerMessages(){
  client.on("message", messageHandler.receivedMessage);
}

function botLogin(){
  client.login(config.BOT_TOKEN);
  console.log("Bot is running.")
}

async function init(){
  botLogin()
  listenToServerMessages()
}

init()