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
    const chatId = msg.chat.id;
    var validURL=RegExp(/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/im)
    if(validURL.test(url)){
      axios.get(`https://api.instagram.com/oembed?url=${url}`).then((data, body)=>{
        var userName = data.data.author_name;
        var userid = data.data.author_url;
        bot.sendMessage(chatId , userName);
        bot.sendMessage(chatId , userid);
      }).catch((err , res)=>{
          bot.sendMessage(chatId , "user not found or your url incorrect")
      })
    }else{
      bot.sendMessage(chatId , "your url is invalid");
    }
});

server.listen(port , ()=>{
  console.log(`server run on port ${port}`)  
})