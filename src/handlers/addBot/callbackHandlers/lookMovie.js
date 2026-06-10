import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function lookMovie(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === 'look_all') {
        session.state = null
        const movies = getMovies()
        const keys = Object.keys(movies)
        const values = Object.values(movies)

        let message = ``
        for (let i = 0; i < keys.length; i++) {
            message += `"${keys[i]}":\n${moviesList(values[i])}`
        }
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, message)
    }
    if (query.data === "look_one") {
        session.state = "LOOK_MOVIE_CODE"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '✍ Напиши код')
    }
}