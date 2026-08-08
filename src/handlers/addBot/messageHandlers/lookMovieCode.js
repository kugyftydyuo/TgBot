import {getSession} from "../../../state/sessionAddBot.js";
import {getMovie} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";

export async function lookMovieCode(chatId, bot, text, userId) {
    const session = getSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        session.state = null
        await bot.sendMessage(chatId, `"${text}":\n${moviesList(movie)}`)
    }
}