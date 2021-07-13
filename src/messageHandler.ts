import { Client, Message } from "discord.js";
import { CommandParser } from "./CommandParser";
import { ICommand } from "./commands/Command";
const BOT_ID = "863633669989466142"
// Refer to https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts for DiscordJS typings

/*
  Interface to handle incoming messages by parsing and executing them.
*/
export interface IMessageHandler {
  client: Client;
  receivedMessage:(message : Message) => void;
}

/*
  Implementation of a Message Handler, which takes in a CommandExecution interface and a CommandParser interface.
*/
export class MessageHandler implements IMessageHandler {
  client: Client;
  constructor(client: Client){
    this.client = client;
  }

  /*
    When a message is received, check if it is from any user that is not the bot.
    Then parse the message into a command, and execute the command if it is valid.
  */
  receivedMessage(message : Message){
    if(message.author.id != BOT_ID){
      const command: ICommand | null = CommandParser.parseCommand(message)
      if(command != null){
        command.execute(this.client)
      }
    }
  }
}