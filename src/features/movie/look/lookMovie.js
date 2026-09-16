import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../consts/strings.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {pagesKeyboard} from "../../../keyboards/pages.js";

export async function lookMovie(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

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