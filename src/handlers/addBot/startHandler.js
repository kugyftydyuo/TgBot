import {addBotForAdminsKeyboard, addBotKeyboard} from "../../utils/keyboards.js";
import {admins} from "../../config/workers.js";

export function startHandler(chatId, bot, userId) {
    if (admins.includes(userId)) {
        return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку", {
            reply_markup: addBotForAdminsKeyboard()
        })
    } else {
        return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку", {
            reply_markup: addBotKeyboard()
        })
    }
}