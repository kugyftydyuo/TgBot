import {admins} from "../../config/workers.js";
import {getSession} from "../../state/sessionAddBot.js";

export function deleteHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getSession(userId)
        session.state = 'DELETE_MOVIE'
        return bot.sendMessage(chatId, '✍ Напиши код')
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}