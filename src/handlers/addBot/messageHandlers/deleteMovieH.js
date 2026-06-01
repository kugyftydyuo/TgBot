import {getSession} from "../../../state/sessionAddBot.js";
import {getMovies, deleteMovie} from "../../../services/moviesService.js";

export async function deleteMovieH(chatId, bot, text, userId) {
    const session = getSession(userId)
    const movies = getMovies()

    if (!movies[text]) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        deleteMovie(text)
        session.state = null
        await bot.sendMessage(chatId, `✅ Фильм с кодом ${text} успешно удален`)
    }
}