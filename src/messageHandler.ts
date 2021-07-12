import { Client, Message } from "discord.js";
import { ICommandExecution } from "./CommandExecution";
import { Command, ICommandParser } from "./CommandParser";
const BOT_ID = "863633669989466142"
// Refer to https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts for DiscordJS typings

export interface IMessageHandler {
  client: Client;
  commandExecution: ICommandExecution;
  commandParser: ICommandParser;
  receivedMessage:(message : Message, client: Client) => void;
}

export class MessageHandler implements IMessageHandler {
  client: Client;
  commandExecution: ICommandExecution;
  commandParser: ICommandParser;
  constructor(client: Client, commandExecution: ICommandExecution, commandParser: ICommandParser){
    this.client = client;
    this.commandExecution = commandExecution
    this.commandParser = commandParser
  }

  receivedMessage(message : Message, client: Client){
    if(message.author.id != BOT_ID){
      // message.channel.send({content: "Got your message: " + message.content});
      const command: Command | null = this.commandParser.parseCommand(message)
      if(command != null){
        this.commandExecution.executeCommand(command, client)
      }
    }
  }
}