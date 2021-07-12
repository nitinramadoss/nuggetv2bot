import { Client, TextChannel } from "discord.js";
import { ImpersonateCommand } from "./CommandParser";

/*
  Interface to handle impersonation command.
*/
export interface IImpersonationHandler {
  // This is the channel ID to explicitly send the message to.
  channelIDToSendMessage: string;
  handleImpersonationCommand:(command: ImpersonateCommand, client: Client) => boolean;
}

/*
  Implementation of Impersonation command execution.
*/
export class ImpersonationHandler implements IImpersonationHandler {
  channelIDToSendMessage: string;
  constructor(channelIDToSendMessage: string){
    this.channelIDToSendMessage = channelIDToSendMessage
  }

  /*
    Check if the command was sent in a DM to the bot, and resend the message to the given channel.
  */
  handleImpersonationCommand(command: ImpersonateCommand, client: Client): boolean {
    if(command.discordMessage?.channel.type == "dm"){
      const channel = client.channels.cache.get(this.channelIDToSendMessage) as TextChannel;
      channel.send(command.message)
      return true;
    }else{
      return false;
    }
  }
}