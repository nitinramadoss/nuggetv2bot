import { Client as DiscordClient, Message} from "discord.js";
import { IMessageHandler, MessageHandler } from "./messageHandler";

export class App {
  client = new DiscordClient();
  messageHandler : IMessageHandler;

  setupMessageHandler(){
    this.messageHandler = new MessageHandler(this.client);
  }

  listenToServerMessages(){
    this.client.on("message", async (message: Message) =>{
      this.messageHandler.receivedMessage(message)
    });
  }

  botLogin(botToken: string){
    this.client.login(botToken);
    console.log("Bot is running.")
  }

  constructor(botToken: string){
    this.botLogin(botToken)
    this.setupMessageHandler()
  }
}