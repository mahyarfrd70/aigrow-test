const http =require("http")
const express = require("express");
const axios = require("axios")
const bodyParser  = require("body-parser")
const TelegramBot = require('node-telegram-bot-api');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = process.env.PORT || 3000
var server = http.createServer(app)

var token = "736696385:AAEb8LiK8Dk5-VdAz_60HjleSe6UFeSA_FU"
var bot = new TelegramBot(token , {polling: true});

bot.on('message', function(msg){
    var url = msg.text;
    axios.get(`https://api.instagram.com/oembed?url=${url}`).then((data, body)=>{
      const chatId = msg.chat.id;
      var userName = data.data.author_name;
      var userid = data.data.author_url;
      bot.sendMessage(chatId , userName);
      bot.sendMessage(chatId , userid);
    }).catch((err)=>{
      throw new Error(err)
    })
});

server.listen(port , ()=>{
  console.log(`server run on port ${port}`)  
})