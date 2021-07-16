import { Client, Message } from "discord.js";

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
export interface ICommand {
  type: CommandType,
  discordMessage?: Message
  execute:(client?: Client) => void;
}