import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {lookMoviesKeyboard} from "../../../keyboards/lookMovies.js";

export async function lookHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = "LOOK_MOVIE"
        await bot.sendMessage(chatId, '❓ Что хочешь посмотреть?', {
            reply_markup: lookMoviesKeyboard()
        })
    } else {
        return bot.sendMessage(chatId, '❌ Нет доступа')
    }
}