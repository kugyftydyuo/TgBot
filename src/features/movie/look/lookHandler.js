import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {lookMoviesKeyboard} from "../../../keyboards/lookMovies.js";
import {emojis} from "../../../config/emojis.js";

export async function lookHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = "LOOK_MOVIE"
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.question2 }\'>👍</tg-emoji> Что хочешь посмотреть?`, {
            reply_markup: lookMoviesKeyboard(),
            parse_mode: 'HTML'
        })
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.angry }\'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}