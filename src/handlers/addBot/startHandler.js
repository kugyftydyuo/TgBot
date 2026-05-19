import {statsKeyboard} from "../../utils/keyboards.js";

export function startHandler(chatId, bot) {
    return bot.sendMessage(chatId, "Добро пожаловать\nЗдесь вы можете добавить бота по коду\nДля того чтобы добавить бота напишите /add название", {
        reply_markup: statsKeyboard()
    })
}