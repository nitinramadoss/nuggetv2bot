import { Client, Message } from "discord.js";
const BOT_ID = "863633669989466142"
// Refer to https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts for DiscordJS typings

export interface IMessageHandler {
  client: Client;
  receivedMessage:(message : Message) => void;
}

export class MessageHandler implements IMessageHandler {
  client: Client;
  constructor(client: Client){
    this.client = client;
  }

  async receivedMessage(message : Message){
    if(message.author.id != BOT_ID){
      message.channel.send({content: "Got your message: " + message.content});

    }
  }
}