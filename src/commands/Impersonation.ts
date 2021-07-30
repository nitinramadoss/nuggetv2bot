import { Client, Message, TextChannel } from "discord.js";
import { ICommand } from "./Command";

/*
  Extension of the base Command interface for the Impersonate command.
  The impersonate command only needs the message to echo.
*/
export interface IImpersonateCommand extends ICommand {
  // This is the channel ID to explicitly send the message to.
  channelIDToSendMessage: string;
  message: string;
}

/*
  Implementation of Impersonation command execution.
*/
export class ImpersonateCommand implements IImpersonateCommand {
  discordMessage?: Message
  channelIDToSendMessage: string;
  message: string
  constructor(channelIDToSendMessage: string, message: string){
    this.channelIDToSendMessage = channelIDToSendMessage
    this.message = message
  }

  /*
    Check if the command was sent in a DM to the bot, and resend the message to the given channel.
  */
  execute(client?: Client) {
    if(this.discordMessage?.channel.type != "dm"){
      return
    }
    const channel = client?.channels.cache.get(this.channelIDToSendMessage) as TextChannel;
    channel.send(this.message)
  }
}

