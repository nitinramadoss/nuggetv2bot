import { Message } from "discord.js";

/* 
  Enum to keep track the current commands that are implemented and the string needed to execute that command.
  Must be all lowercase to match.
*/
export enum CommandType {
  Impersonate = "impersonate"
}

/*
  Base Command interface to store the type of command and the underlying discord message associated with it.
*/
export interface Command {
  type: CommandType,
  discordMessage?: Message
}

/*
  Extension of the base Command interface for the Impersonate command.
  The impersonate command only needs the message to echo.
*/
export interface ImpersonateCommand extends Command {
  type: CommandType.Impersonate
  message: string
}

/*
  Interface to handle command parsing (converting a discord message into a Command interface)
*/
export interface ICommandParser {
  PREFIX: string
  parseCommand:(message: Message) => Command | null;
}

/*
  Implementation to handle converting a Message into a Command.
*/
export class CommandParser implements ICommandParser {
  PREFIX: string

  // Initialize the Parser with a prefix to look for at the start of each message.
  constructor(prefix: string){
    this.PREFIX = prefix
  }

  /*
    Function to convert a Message to a Command.
    First check if there is a valid command prefix at the start of a mesage (such as "/").
    Then get the type of the command and convert the message text into a Command.
    If successful, populate the discordMessage variable and return the command.
  */
  parseCommand(message: Message): Command | null {
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
  buildCommandFromType(commandType: string, messageText: string): Command | null{
    const args = messageText.split(" ").slice(1)
    switch(commandType){
      case CommandType.Impersonate:
        return this.parseImpersonateCommand(args)
      // case CommandType.FutureCommandType:
      //   return this.<function>
    }
    return null
  }

  /*
    Specific function to parse Impersonate Command data.
  */
  parseImpersonateCommand(args: string[]): ImpersonateCommand{
    const impersonateMessage = args[0]
    const command : ImpersonateCommand = {type: CommandType.Impersonate, message: impersonateMessage}
    return command
  }

  /*
    Function to test if a message starts with the required prefix
  */
  validPrefix(messageText: string): boolean {
    let prefix = messageText.substring(0, this.PREFIX.length)
    return prefix == this.PREFIX
  }

  /*
    Returns the type of command (the text after the prefix)
  */
  getCommandType(messageText: string): string | null {
    // Splits by spaces, and removes the prefix from the first element to leave just the command type.
    const messageParts = messageText.split(" ");
    if(messageParts.length > 0){
      return messageParts[0].substring(this.PREFIX.length)
    }
    return null
  }
}