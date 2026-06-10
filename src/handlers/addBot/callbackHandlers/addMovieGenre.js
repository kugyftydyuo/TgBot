import {genres} from "../../../config/parallels.js";
import {addMovie} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function addMovieGenre(query, userId, chatId, bot, messageId) {
    const session = getSession(userId)
    const username = query.from.username
    const lastName = query.from.first_name

    session.data.genre = genres[query.data]
    session.state = null

    addMovie(session.data)

    await bot.sendMessage(8501167201, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
    await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(chatId, `✅ Фильм был добавлен по коду ${session.data.code}`)
}