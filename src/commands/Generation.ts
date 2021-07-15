import { Client, Message, TextChannel } from "discord.js";
import { ComplimentGenerator, InsultGenerator, JokeGenerator } from "../generators";
import { CommandType, ICommand } from "./Command";

/*
  Extension of the base Command interface for the Generate command.
*/
export interface IGenerationCommand extends ICommand {
  // This is the channel ID to explicitly send the message to.
  channelIDToSendMessage: string;
  message: string;
}

/*
  Implementation of Impersonation command execution.
*/
export class GenerationCommand implements IGenerationCommand {
  type: CommandType
  discordMessage?: Message
  channelIDToSendMessage: string;
  message: string
  constructor(channelIDToSendMessage: string, message: string){
    this.channelIDToSendMessage = channelIDToSendMessage
    this.message = message
  }

  /*
    Check which random generator was requested, then send random phrase to the given channel
  */
  async execute(client: Client) {
    const channel = client.channels.cache.get(this.channelIDToSendMessage) as TextChannel;
    var generator
    var phrase = "Not valid" //default
    
    switch(this.message){
      case "joke":
        generator = new JokeGenerator()
        break
      case "roast":
        generator = new InsultGenerator()
        break
      case "compliment":
        generator = new ComplimentGenerator()
        break
    }
    
    if (generator != undefined) {
      phrase = await generator.generate()
    }

    channel.send(phrase)
  }
}