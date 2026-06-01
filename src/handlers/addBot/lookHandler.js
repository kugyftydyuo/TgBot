import {admins} from "../../config/workers.js";
import {getMovies} from "../../services/moviesService.js";
import {getSession} from "../../state/sessionAddBot.js";
import {lookMoviesKeyboard} from "../../utils/keyboards.js";

export async function lookHandler(msg, bot, code) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getSession(userId)
        session.state = "LOOK_MOVIE"
        await bot.sendMessage(chatId, '❓ Что хочешь посмотреть?', {
            reply_markup: lookMoviesKeyboard()
        })
    } else {
        return bot.sendMessage(chatId, '❌ Нет доступа')
    }
}