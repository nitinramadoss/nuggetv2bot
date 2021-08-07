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
//:quote find "yolo" // Working
//:quote find
//:quote random
//:quote delete

//TheLegend27 = 0
//Edison = 1
//Satvik = 2
//NKR = 3
//AweKingSome = 4

export interface IPoemCommand extends ICommand {
  generationType: string;
  findType: string;
  findTypeSize: number;
}
  
export class PoemCommand implements IPoemCommand {
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
            var value = message.author.id
            const data = fs.readFileSync('poemes.json', 'utf8');
            const userArray = JSON.parse(data)
            if(this.findTypeSize == 0){
              try {
                const quote = {
                  "poem": message.content,
                  "poemTimestamp": message.createdTimestamp,
                  "messageId": message.id
                }
                if (userArray[value] == null) {
                  userArray[value] = []
                }
                userArray[value].push(quote)
                //Sort the quotes
                fs.writeFileSync('poemes.json', JSON.stringify(userArray));
                console.log("JSON data is saved.");
              } catch (error) {
                console.log("JSON data cannot be saved")
                console.error(error);
              }
            }
            else if(this.generationType == "find" && userArray[value].length > 0 ){ 
              try{
                // :quote find #2 -> Still Works
                if(this.findTypeSize == 2){
                  if(this.findType[0] == "#"){
                    let number = this.findType.substring(1)
                    let parsedNumber = parseInt(number)
                    if(parsedNumber <= userArray[value].length){
                      this.discordMessage?.channel.send(userArray[value][parsedNumber-1].quote)
                    }else{
                      this.discordMessage?.channel.send("The #X of quote does not exist for this person")
                    }
                  }
                  // :quote find "yolo" -> Still Works
                  else if(this.findType[0] == '"' ){
                    let word = this.findType.substring(1, this.findType.length)
                    let number = 0
                    // let match = 0;
                    for(let i = 0; i < userArray[value].length; i = i + 1){
                      let text = userArray[value][i].quote
                      if(text.indexOf(word) > -1){
                        word = userArray[value][i].quote
                        number = i
                        // match = -1
                      }
                    }
                    if (word == ""){
                      this.discordMessage?.channel.send("The person has written no quote with the given phrase")
                    } else {
                      this.discordMessage?.channel.send(number + " " + word)
                    }
                  }
                }
                // :quote find
                else if(this.findTypeSize == 1){
                  if(this.generationType == "find"){
                    let word = ""
                    for(let i = 0; i < userArray[value].length; i = i + 1){
                      word = word + " " + i + " " + userArray[value][i].quote
                    }
                    this.discordMessage?.channel.send(word)
                  }
                }
              }catch (error) {
                console.log("Generator Type Find Is Not Working")
              }
            }
            else if(this.generationType == "random" && userArray[value].length > 0 ){
              try{
                var i = Math.floor(Math.random() * userArray[value].length-1);
                this.discordMessage?.channel.send(i + " " + userArray[value][i].quote)
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
                let number = this.findType.substring(1)
                if(parseInt(number)-1 < Object.keys(userArray).length){
                  userArray[value].splice(parseInt(number)-1,1)
                  fs.writeFileSync('poemes.json', JSON.stringify(userArray));
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