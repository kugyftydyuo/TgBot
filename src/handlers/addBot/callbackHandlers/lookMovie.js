import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {pagesKeyboard} from "../../../utils/keyboards.js";

export async function lookMovie(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === 'look_all') {
        session.state = "LOOK_ALL_MOVIE"
        const movies = getMovies()

        let message = `❗️                                                                                                              СТРАНИЦА 1\n\n`
        for (let i = 0; i < 5; i++) {
            if (!movies[i]) break
            message += `"${movies[i].code}":\n${moviesList(movies[i])}`
        }
        await bot.editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: pagesKeyboard(movies.length, "look")
        })
    }
    if (query.data === "look_one") {
        session.state = "LOOK_MOVIE_CODE"
        await bot.editMessageText('✍ Напиши код', {
            chat_id: chatId,
            message_id: messageId
        })
    }
}