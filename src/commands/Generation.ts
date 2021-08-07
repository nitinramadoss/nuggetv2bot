import { Client, Message } from "discord.js";
import { ComplimentGenerator, InsultGenerator, JokeGenerator, TriviaGenerator } from "../generators";
import { ICommand } from "./Command";

enum GenerationType {
  Joke = "joke",
  Roast = "roast",
  Compliment = "compliment",
  Trivia = "trivia"
}

/*
  Extension of the base Command interface for the Generate command.
*/
export interface IGenerationCommand extends ICommand {
  generationType: string;
}

/*
  Implementation of Generation command execution.
*/
export class GenerateCommand implements IGenerationCommand {
  discordMessage?: Message
  generationType: string
  constructor(generationType: string){
    this.generationType = generationType
  }

  /*
    Check which random generator was requested, then send random phrase to the given channel
  */

  async execute(_?: Client) {
    var generator
    var phrase = "Not valid" //default

    switch(this.generationType){
      case GenerationType.Joke:
        generator = new JokeGenerator()
        break
      case GenerationType.Roast:
        generator = new InsultGenerator()
        break
      case GenerationType.Compliment:
        generator = new ComplimentGenerator()
        break
      case GenerationType.Trivia:
        generator = new TriviaGenerator()
        break
    }
    
    if (generator != undefined) {
      phrase = await generator.generate()
    }
    
    this.discordMessage?.channel.send(phrase)
  }
}