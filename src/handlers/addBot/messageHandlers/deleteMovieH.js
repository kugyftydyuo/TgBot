import {getSession} from "../../../state/sessionAddBot.js";
import {getMovie, deleteMovie} from "../../../services/moviesService.js";

export async function deleteMovieH(chatId, bot, text, userId) {
    const session = getSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        deleteMovie(text)
        session.state = null
        await bot.sendMessage(chatId, `✅ Фильм с кодом ${text} успешно удален`)
    }
}