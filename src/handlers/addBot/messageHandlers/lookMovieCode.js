import {getSession} from "../../../state/sessionAddBot.js";
import {getMovies} from "../../../services/moviesService.js";

export async function lookMovieCode(chatId, bot, text, userId) {
    const session = getSession(userId)
    const movies = getMovies()

    if (!movies[text]) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        session.state = null
        await bot.sendMessage(chatId, `"${text}":\n🗯 Название: ${movies[text].name}\n📒 Кол-во серий: ${movies[text].episodes}\n🎬 Жанр: ${movies[text].genre}`)
    }
}