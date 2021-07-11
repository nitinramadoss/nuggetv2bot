const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

function listenToServerMessages(){

}

function botLogin(){
  client.login(config.BOT_TOKEN);
}

function init(){
  botLogin()
  listenToServerMessages()
}

init()