const http =require("http")
const express = require("express");
const bodyParser  = require("body-parser")
const TelegramBot = require('node-telegram-bot-api');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = process.env.PORT || 3000
var server = http.createServer(app)

var token = "809840261:AAH3H5HVVmK6q3QQZWwpnRXWbm30kXlIlb4"
var bot = new TelegramBot(token , {polling: true});
 
//sevice & models
const services = require("./services")
const models = require("./models")

//mode variable
var mode = require("./mode")

//on message event of bot
bot.on('message', function(msg){
  //variables
  var url = msg.text;
  const chatId = msg.chat.id;
  var validURL=RegExp(/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/im)
  let mainButtons = [["Submit Instagram URL"] , ["Engagement Groups"] , ["Engagements Received"] , ["Join Groups"]]

  //conditions
  if(url === "/start" ){
    models.keyboard(bot , chatId , "choos your activity" , mainButtons)
    return
  }
  if(url === "Submit Instagram URL"){
    mode.set("inputUrl")
    let returnButton = [["return"]]
    models.keyboard(bot , chatId , "please send your url" , returnButton , false , true)
    return;
  }
  if(mode.get() === "inputUrl" && url !== "return"){
    services.getUserOfInstagramPostUrl(validURL , url).then((data)=>{
      var userName = data.data.author_name;
      var mediaId = data.data.media_id;
      return services.getUserInfoFromAigrow(userName , mediaId)
    }).then((data)=>{
      var error = data.data.error || null
      var instaId = data.data.instaId
      var mediaId = data.data.mediaId
      if(error){
        bot.sendMessage(chatId , data.data.message)
        return;
      }
      return services.startPODsActivity(instaId , mediaId)
    }).then((data)=>{
      bot.sendMessage(chatId , data.data.message).then(()=>{
        mode.set("")
        models.keyboard(bot , chatId , "choos your activity" , mainButtons)
      })
    }).catch((err)=>{
      bot.sendMessage(chatId , err);
      return;
    })
  }
  if(url === "Engagement Groups"){
    let engagementGroupsButton = [["Super Turbo" , "Turbo"] , ["Rising" , "Starter"] , ["return"]]
    models.keyboard(bot , chatId , "please choose youre group" , engagementGroupsButton  , false , true)
    return;
  }
  if(url === "return"){
    mode.set("")
    models.keyboard(bot , chatId , "choos your activity" , mainButtons)
    return
  }
  if(validURL.test(url) && mode.get() === "") {
    bot.sendMessage(chatId , "first choose your activity");
  }
});

server.listen(port , ()=>{
  console.log(`server run on port ${port}`)  
})