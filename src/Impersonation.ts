import { Client, TextChannel } from "discord.js";
import { ImpersonateCommand } from "./CommandParser";

export interface IImpersonationHandler {
  channelIDToSendMessage: string;
  handleImpersonationCommand:(command: ImpersonateCommand, client: Client) => boolean;

}

export class ImpersonationHandler implements IImpersonationHandler {
  channelIDToSendMessage: string;
  constructor(channelIDToSendMessage: string){
    this.channelIDToSendMessage = channelIDToSendMessage
  }

  handleImpersonationCommand(command: ImpersonateCommand, client: Client): boolean {
    // message.channel.send(command.message)
    // client.channels.cache.get(this.channelIDToSendMessage).send(command.message)
    const channel = client.channels.cache.get(this.channelIDToSendMessage) as TextChannel;
    channel.send(command.message)
    return true;
  }
}