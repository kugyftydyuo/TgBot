import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie, deleteMovie} from "../../../services/moviesService.js";

export async function deleteMovieH(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        deleteMovie(text)
        session.state = null
        await bot.sendMessage(chatId, `✅ Фильм с кодом ${text} успешно удален`)
    }
}