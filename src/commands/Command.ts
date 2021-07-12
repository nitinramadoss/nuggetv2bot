import { Client } from "discord.js";
import { CommandData } from "src/CommandParser";

export interface Command {
  execute:(command: CommandData, client: Client) => void;
}