import { Client, Message } from "discord.js";
import { Command, CommandType, ImpersonateCommand } from "./CommandParser";
import { ImpersonationHandler } from "./Impersonation";

export interface CommandExecutionInstances {
  impersonationHandler: ImpersonationHandler;
}

export interface ICommandExecution {
  commandExecutionInstances: CommandExecutionInstances;
  executeCommand:(command: Command, message: Message | Client) => boolean;
}

export class CommandExecution implements ICommandExecution {
  commandExecutionInstances: CommandExecutionInstances;

  constructor(commandExecutionInstances: CommandExecutionInstances){
    this.commandExecutionInstances = commandExecutionInstances
  }

  executeCommand(command: Command, message: Message | Client): boolean {
    switch(command.type){
      case CommandType.Impersonate:
        return this.commandExecutionInstances.impersonationHandler.handleImpersonationCommand(command as ImpersonateCommand, message as Client)
      break;
    }
  }
}