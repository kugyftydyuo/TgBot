import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {emojis} from "../../../config/emojis.js";

export async function addCodeHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId);
        session.data = {
            code: null
        }
        session.state = 'ADD_MOVIE_CODE';
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.plus }\'>👍</tg-emoji> Добавление новой записи...\n\n<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши код под которым нужно добавить фильм`, {parse_mode: 'HTML'});
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.angry }\'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}