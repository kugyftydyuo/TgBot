import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {lookMoviesPagesKeyboard} from "../../../utils/keyboards.js";

export async function lookMovie(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === 'look_all') {
        session.state = "LOOK_ALL_MOVIE"
        const movies = getMovies()
        const keys = Object.keys(movies)
        const values = Object.values(movies)

        let message = `❗️                                                                                                              СТРАНИЦА 1\n\n`
        for (let i = 0; i < 5; i++) {
            message += `"${keys[i]}":\n${moviesList(values[i])}`
        }
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, message, {
            reply_markup: lookMoviesPagesKeyboard(keys.length)
        })
    }
    if (query.data === "look_one") {
        session.state = "LOOK_MOVIE_CODE"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '✍ Напиши код')
    }
}