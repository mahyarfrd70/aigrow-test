class Models{
    keyboard(bot , chatId , message , buttons , oneTimeKeyboard = false , resizeKeyboard = false){
        bot.sendMessage(chatId, message, {
            "reply_markup": {
                "keyboard": buttons,
                "one_time_keyboard": oneTimeKeyboard,
                "resize_keyboard" : resizeKeyboard 
            }
        })
    }
}
module.exports = new Models()