import { Client, Message} from "discord.js";
// import { connect } from "http2";
import { ICommand } from "./Command";
const fs = require('fs');
/*
  Extension of the base Command interface for the Impersonate command.
  The impersonate command only needs the message to echo.
*/

//The types of commands are as followed
//:quote 
//:quote find #2
//:quote find "yolo"
//:quote find
//:quote random
//:quote delete

//TheLegend27 = 0
//Edison = 1
//Satvik = 2
//NKR = 3
//AweKingSome = 4

export interface IQuoteCommand extends ICommand {
  generationType: string;
  findType: string;
  findTypeSize: number;
}
  
export class QuoteCommand implements IQuoteCommand {
    discordMessage?: Message;
    generationType: string;
    findType: string;
    findTypeSize: number;
    constructor(generationType: string, findType: string, findTypeSize: number){
      this.generationType = generationType;
      this.findType = findType;
      this.findTypeSize = findTypeSize;
    }
    execute(_client?: Client) {
      if(this.discordMessage?.reference?.messageID != null){
          this.discordMessage?.channel.messages.fetch(this.discordMessage?.reference?.messageID!)
          .then(message => {
            //Helpfull PreDebugging Tool
            // console.log("findType")
            // console.log(this.findType)
            // console.log("findTypeSize")
            // console.log(this.findTypeSize)
            // console.log("generationType")
            // console.log(this.generationType)
            var value = -1
            if (message.author.username == "TheLegend27"){
              value = 0;
            } else if (message.author.username == "Edison"){
              value = 1;
            } else if (message.author.username == "Satvik"){
              value = 2;
            } else if (message.author.username == "NKR"){
              value = 3
            } else if (message.author.username == "AweKingSome"){
              value = 4
            }
            const data = fs.readFileSync('quotes.json', 'utf8');
            const userArray = JSON.parse(data)
            if(this.findTypeSize == 0){
              try {
                const quote = {
                  "quote": message.content,
                }
                if (message.author.username == "TheLegend27") {
                  userArray[0].push(quote)
                } else if(message.author.username == "Edison") {
                  userArray[1].push(quote)
                } else if(message.author.username == "Satvik") {
                  userArray[2].push(quote)
                } else if(message.author.username == "NKR") {
                  userArray[3].push(quote)
                } else if(message.author.username == "AweKingSum") {
                  userArray[4].push(quote)
                }
                fs.writeFileSync('quotes.json', JSON.stringify(userArray));
                console.log("JSON data is saved.");
              } catch (error) {
                console.log("JSON data cannot be saved")
                console.error(err);
              }
            }
            else if(this.generationType == "find" && Object.keys(userArray[value]).length > 0 ){ 
              try{
                // :quote find #2 -> Still Works
                if(this.findTypeSize == 2){
                  let number = this.findType[1]
                  if(this.findType[2] != null){
                    number = number + this.findType[2]
                  }
                  if(this.findType[3] != null){
                    number = number + this.findType[3]
                  }
                  if(this.findType[0] == "#"){
                    if(parseInt(number) <= Object.keys(userArray[value]).length){
                      this.discordMessage?.channel.send(userArray[value][parseInt(this.findType[1])-1].quote)
                    }else{
                      this.discordMessage?.channel.send("The #X of quote does not exist for this person")
                    }
                  }
                  // :quote find "yolo" -> Still Works
                  else if(this.findType[0] == '"' ){
                    let word = ""
                    for(let i = 1; i < this.findType.length-1; i = i + 1){
                      word = word + this.findType[i]
                    }
                    let match = 0;
                    for(let i = 0; i < Object.keys(userArray[value]).length; i = i + 1){
                      let text = userArray[value][i].quote
                      if(text.indexOf(word) > -1){
                        this.discordMessage?.channel.send(i)
                        this.discordMessage?.channel.send(userArray[value][i].quote)
                        match = -1
                      }
                    }
                    console.log(match)
                    if (match == 0){
                      this.discordMessage?.channel.send("The person has written no quote with the given phrase")
                    }
                  }
                }
                // :quote find
                else if(this.findTypeSize == 1){
                  if(this.generationType == "find"){
                    for(let i = 0; i < Object.keys(userArray[value]).length; i = i + 1){
                      this.discordMessage?.channel.send(i)
                      this.discordMessage?.channel.send(userArray[value][i].quote)
                    }
                  }
                }
              }catch (error) {
                console.log("Generator Type Find Is Not Working")
              }
            }
            else if(this.generationType == "random" && Object.keys(userArray[value]).length > 0 ){
              try{
                var i = Math.floor(Math.random() * userArray[value].length);
                this.discordMessage?.channel.send(i)
                this.discordMessage?.channel.send(userArray[value][i].quote)
                      //Will implement once more quotes are added.
                      // else if(this.findType == "Random"){
                      //   var a = Math.floor(Math.random() * userArray.length);
                      //   var b = Math.floor(Math.random() * userArray[message.author.username].length);
                      //   this.discordMessage?.channel.send(userArray[a].username)
                      //   this.discordMessage?.channel.send(userArray[a][b].quote)
                      // }
              } catch(error){
                console.log("Generator Type Random Is Not Working")
              }
            }
            else if(this.generationType == "delete" && Object.keys(userArray[value]).length > 0 ){
              try{
                let number = this.findType[1]
                if(this.findType[2] != null){
                  number = number + this.findType[2]
                }
                if(this.findType[3] != null){
                  number = number + this.findType[3]
                }
                if(parseInt(number)-1 <= Object.keys(userArray).length){
                  userArray[value].splice(parseInt(number)-1,1)
                  const data2 = fs.readFileSync('quotes2.json', 'utf8');
                  const newUserArray = JSON.parse(data2)
                  for(let i = 0; i < Object.keys(userArray).length; i = i + 1){
                    for(let j = 0; j < Object.keys(userArray[i]).length; j = j + 1){
                      try {
                        if (i == 0) {
                          newUserArray[0].push(userArray[i][j])
                        } else if (i == 1) {
                          newUserArray[1].push(userArray[i][j])
                        } else if (i == 2) {
                          newUserArray[2].push(userArray[i][j])
                        } else if (i == 3) {
                          newUserArray[3].push(userArray[i][j])
                        } else if (i == 4) {
                          newUserArray[4].push(userArray[i][j])
                        }
                      } catch (error) {
                        console.log("JSON data cannot be saved")
                        console.error(err);
                      }
                    }
                  }
                  fs.writeFileSync('quotes.json', JSON.stringify(newUserArray));
                  console.log("JSON data is saved.");
                }else{
                  this.discordMessage?.channel.send("The #X of quote does not exist for this person, thus you cant delete it")
                }
              } catch(error){
                console.log("Generator Type Delete Is Not Working")
              }
            }else {
              this.discordMessage?.channel.send("The person currently has no quotes")
            }
          })
      }
    }
}
function err(_err: any) {
  throw new Error("Function not implemented.");
}
  