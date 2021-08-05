import { Client, Message } from "discord.js";

/*
  Base Command interface to store the type of command and the underlying discord message associated with it.
*/
export interface ICommand {
  discordMessage?: Message
  execute:(client?: Client) => void;
}