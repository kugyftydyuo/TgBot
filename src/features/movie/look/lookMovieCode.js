import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie} from "../../../services/moviesService.js";
import {moviesList} from "../../../consts/strings.js";

export async function lookMovieCode(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        session.state = null
        await bot.sendMessage(chatId, `"${text}":\n${moviesList(movie)}`)
    }
}