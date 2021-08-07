import { Message } from "discord.js";
import { ICommand } from "./commands/Command";
import { GenerateCommand, IGenerationCommand } from "./commands/Generation";
import { IImpersonateCommand, ImpersonateCommand } from "./commands/Impersonation";
import { IJokeCommand, JokeCommand } from "./commands/Joke";
import { IPoemCommand, PoemCommand } from "./commands/Poem";
import { IQuoteCommand, QuoteCommand } from "./commands/Quote";


/* 
  Enum to keep track the current commands that are implemented and the string needed to execute that command.
  Must be all lowercase to match.
*/
export enum CommandType {
  Impersonate = "impersonate",
  Generate = "random",
  Quote = "quote",
  Poem = "poem",
  Joke = "joke"
}

/*
  Implementation to handle converting a Message into a Command.
*/
export class CommandParser {

  private static PREFIX: string = ":"

  /*
    Function to convert a Message to a Command.
    First check if there is a valid command prefix at the start of a mesage (such as "/").
    Then get the type of the command and convert the message text into a Command.
    If successful, populate the discordMessage variable and return the command.
  */
  public static parseCommand(message: Message): ICommand | null {
    // entire message (with prefix, command, and args)
    const messageText = message.content
    if(this.validPrefix(messageText)){
      const commandType = this.getCommandType(messageText)?.toLowerCase()
      if(commandType != null){
        const command = this.buildCommandFromType(commandType, messageText)
        if(command){
          command.discordMessage = message
          return command;
        }
      }
    }
    return null;
  }

  /*
    Convert the raw text a user sends into its corresponding Command using the given command type.
  */
  public static buildCommandFromType(commandType: string, messageText: string): ICommand | null{
    const args = messageText.split(" ").slice(1)
    console.log(args)
    switch(commandType){
      case CommandType.Impersonate:
        return this.parseImpersonateCommand(args)
      case CommandType.Generate:
        return this.parseGenerateCommand(args)
      case CommandType.Quote:
          return this.parseQuoteCommand(args)
      case CommandType.Poem:
          return this.parsePoemCommand(args)
      case CommandType.Poem:
          return this.parseJokeCommand(args)
      // case CommandType.FutureCommandType:
      //   return this.<function>
    }
    return null
  }

  /*
    Specific function to parse Impersonate Command data.
  */
  public static parseImpersonateCommand(args: string[]): IImpersonateCommand{
    const impersonateMessage = args.join(" ")
    const command = new ImpersonateCommand("863639521564295221", impersonateMessage)
    return command
  }

  /*
    Specific function to parse Generate Command data.
  */
  public static parseGenerateCommand(args: string[]): IGenerationCommand{
    const generateMessage = args[0]
    const command = new GenerateCommand(generateMessage)
    return command
  }

  public static parseQuoteCommand(args: string[]): IQuoteCommand{
    const generateMessage = args[0]
    const size: number = args.length
    const command = new QuoteCommand(generateMessage, args.slice(1).join(" "), size)
    return command
  }

  public static parsePoemCommand(args: string[]): IPoemCommand{
    const generateMessage = args[0]
    const size: number = args.length
    const command = new PoemCommand(generateMessage, args.slice(1).join(" "), size)
    return command
  }

  public static parseJokeCommand(args: string[]): IJokeCommand{
    const generateMessage = args[0]
    const size: number = args.length
    const command = new JokeCommand(generateMessage, args.slice(1).join(" "), size)
    return command
  }

  /*
    Function to test if a message starts with the required prefix
  */
  public static validPrefix(messageText: string): boolean {
    let prefix = messageText.substring(0, this.PREFIX.length)
    return prefix == this.PREFIX
  }

  /*
    Returns the type of command (the text after the prefix)
  */
  public static getCommandType(messageText: string): string | null {
    // Splits by spaces, and removes the prefix from the first element to leave just the command type.
    const messageParts = messageText.split(" ");
    if(messageParts.length > 0){
      return messageParts[0].substring(this.PREFIX.length)
    }
    return null
  }
}