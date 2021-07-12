import { Client, TextChannel } from "discord.js";
import { ImpersonateCommandData } from "../CommandParser";
import { Command } from "./Command";

/*
  Interface to handle impersonation command. Override the execute function.
*/
export interface IImpersonationHandler extends Omit<Command, 'execute'> {
  // This is the channel ID to explicitly send the message to.
  channelIDToSendMessage: string;
  execute:(command: ImpersonateCommandData, client: Client) => boolean;
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
  execute(command: ImpersonateCommandData, client: Client): boolean {
    if(command.discordMessage?.channel.type == "dm"){
      const channel = client.channels.cache.get(this.channelIDToSendMessage) as TextChannel;
      channel.send(command.message)
      return true;
    }else{
      return false;
    }
  }
}