import { Client as DiscordClient, Message} from "discord.js";
import { IMessageHandler, MessageHandler } from "./messageHandler";
import { CommandExecution, ICommandExecution } from './CommandExecution';
import { ImpersonationHandler } from './Impersonation';
import { CommandParser, ICommandParser } from './CommandParser';

export class App {
  client = new DiscordClient();
  commandExecution : ICommandExecution;
  commandParser: ICommandParser;
  messageHandler : IMessageHandler;

  setupCommandExecution(){
    const impersonationHandler = new ImpersonationHandler("863639521564295221")

    const commandExecutionInstances = {
      impersonationHandler: impersonationHandler
    }
    this.commandExecution = new CommandExecution(commandExecutionInstances)
  }

  setupCommandParser(){
    this.commandParser = new CommandParser("/")
  }

  setupMessageHandler(){
    this.messageHandler = new MessageHandler(this.client, this.commandExecution, this.commandParser);
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
    this.setupCommandParser()
    this.setupCommandExecution()
    this.setupMessageHandler()
    this.listenToServerMessages()
  }

}