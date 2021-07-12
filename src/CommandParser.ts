import { Message } from "discord.js";

// must be all lowercase to match
export enum CommandType {
  Impersonate = "impersonate"
}

export interface Command {
  type: CommandType
}

export interface ImpersonateCommand extends Command {
  type: CommandType.Impersonate
  message: string
}
export interface ICommandParser {
  parseCommand:(message: Message) => Command | null;
}

export class CommandParser implements ICommandParser {
  readonly PREFIX = "/"

  constructor(){}

  parseCommand(message: Message): Command | null {
    // entire message (with prefix, command, and args)
    const messageText = message.content
    if(this.validPrefix(messageText)){
      const commandName = this.getCommandName(messageText)?.toLowerCase()
      if(commandName != null){
        return this.buildCommandFromName(commandName, messageText)
      }
    }
    return null;
  }
  buildCommandFromName(commandName: string, messageText: string): Command | null{
    const args = messageText.split(" ").slice(1)
    switch(commandName){
      case CommandType.Impersonate:
        return this.parseImpersonateCommand(args)
      // case CommandType.FutureCommandType:
      //   return this.commandParser.<function>
    }
    return null
  }

  parseImpersonateCommand(args: string[]): ImpersonateCommand{
    const impersonateMessage = args[0]
    const command : ImpersonateCommand = {type: CommandType.Impersonate, message: impersonateMessage}
    return command
  }

  validPrefix(messageText: string): boolean {
    let prefix = messageText.substring(0, this.PREFIX.length)
    return prefix == this.PREFIX
  }
  getCommandName(messageText: string): string | null {
    // splits by spaces, and removes the prefix from the first element to leave just the command name
    const messageParts = messageText.split(" ");
    if(messageParts.length > 0){
      return messageParts[0].substring(this.PREFIX.length)
    }
    return null
  }
}