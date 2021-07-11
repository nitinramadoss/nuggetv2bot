const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

function listenToServerMessages(){

}

function botLogin(){
  client.login(config.BOT_TOKEN);
  console.log("Bot is running.")
}

function init(){
  botLogin()
  listenToServerMessages()
}

init()