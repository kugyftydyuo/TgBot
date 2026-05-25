import {addBotKeyboard} from "../../utils/keyboards.js";

export function startHandler(chatId, bot) {
    return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь вы можете добавить фильм по коду\nДля того чтобы добавить фильм напишите /add название", {
        reply_markup: addBotKeyboard()
    })
}