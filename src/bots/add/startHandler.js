import {startAdminsKeyboard} from "../../keyboards/startAdmins.js";
import {startWorkersKeyboard} from "../../keyboards/startWorkers.js";
import {admins} from "../../config/workers.js";

export function startHandler(chatId, bot, userId) {
    if (admins.includes(userId)) {
        return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку", {
            reply_markup: startAdminsKeyboard()
        })
    } else {
        return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку", {
            reply_markup: startWorkersKeyboard()
        })
    }
}