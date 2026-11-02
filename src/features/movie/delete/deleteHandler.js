import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {emojis} from "../../../config/emojis.js";

export function deleteHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = 'DELETE_MOVIE'
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши код`, {parse_mode: 'HTML'})
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.angry }\'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}