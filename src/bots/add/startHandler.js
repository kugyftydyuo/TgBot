import {startAdminsKeyboard} from "../../keyboards/startAdmins.js";
import {startWorkersKeyboard} from "../../keyboards/startWorkers.js";
import {admins} from "../../config/workers.js";
import {emojis} from "../../config/emojis.js";

export function startHandler(chatId, bot, userId) {
    if (admins.includes(userId)) {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id='${emojis.hello2}'>👍</tg-emoji> Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку`, {
            parse_mode: 'HTML',
            reply_markup: startAdminsKeyboard()
        })
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id='${emojis.hello2}'>👍</tg-emoji> Добро пожаловать\nЗдесь ты можешь добавить фильм по коду\nДля того чтобы добавить фильм нажми соответствующую кнопку`, {
            reply_markup: startWorkersKeyboard(),
            parse_mode: 'HTML'
        })
    }
}