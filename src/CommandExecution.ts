import { Client } from "discord.js";
import { CommandData, CommandType, ImpersonateCommandData } from "./CommandParser";
import { ImpersonationHandler } from "./commands/Impersonation";

/*
  A single interface to contain all of the implementions for each command.
*/
export interface CommandExecutionInstances {
  impersonationHandler: ImpersonationHandler;
}

/*
  Interface to handle the execution of commands and storing the command execution instances.
*/
export interface ICommandExecution {
  commandExecutionInstances: CommandExecutionInstances;
  executeCommand:(command: CommandData, client: Client) => boolean;
}

/*
  Implementation to handle the execution of each command type.
*/
export class CommandExecution implements ICommandExecution {
  commandExecutionInstances: CommandExecutionInstances;

  constructor(commandExecutionInstances: CommandExecutionInstances){
    this.commandExecutionInstances = commandExecutionInstances
  }

  /*
    Function to handle the execution of a given command.
    Does a switch statement based on the command type and passes the relevant objects to the corresponding Command Execution Instance to execute the command.
  */
  executeCommand(command: CommandData, client: Client): boolean {
    switch(command.type){
      case CommandType.Impersonate:
        return this.commandExecutionInstances.impersonationHandler.execute(command as ImpersonateCommandData, client)
      break;
      /* Add cases here for future commands*/
    }
  }
}