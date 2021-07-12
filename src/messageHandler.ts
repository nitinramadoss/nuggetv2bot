import { Client, Message } from "discord.js";
import { ICommandExecution } from "./CommandExecution";
import { CommandData, ICommandParser } from "./CommandParser";
const BOT_ID = "863633669989466142"
// Refer to https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts for DiscordJS typings

/*
  Interface to handle incoming messages by parsing and executing them.
*/
export interface IMessageHandler {
  client: Client;
  commandExecution: ICommandExecution;
  commandParser: ICommandParser;
  receivedMessage:(message : Message) => void;
}

/*
  Implementation of a Message Handler, which takes in a CommandExecution interface and a CommandParser interface.
*/
export class MessageHandler implements IMessageHandler {
  client: Client;
  commandExecution: ICommandExecution;
  commandParser: ICommandParser;
  constructor(client: Client, commandExecution: ICommandExecution, commandParser: ICommandParser){
    this.client = client;
    this.commandExecution = commandExecution
    this.commandParser = commandParser
  }

  /*
    When a message is received, check if it is from any user that is not the bot.
    Then parse the message into a command, and execute the command if it is valid.
  */
  receivedMessage(message : Message){
    if(message.author.id != BOT_ID){
      const command: CommandData | null = this.commandParser.parseCommand(message)
      if(command != null){
        this.commandExecution.executeCommand(command, this.client)
      }
    }
  }
}