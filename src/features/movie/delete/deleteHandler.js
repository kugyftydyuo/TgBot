import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";

export function deleteHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = 'DELETE_MOVIE'
        return bot.sendMessage(chatId, '✍ Напиши код')
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}