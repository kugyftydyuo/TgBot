import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../consts/strings.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {pagesKeyboard} from "../../../keyboards/pages.js";
import {emojis} from "../../../config/emojis.js";

export async function lookMovie(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    if (query.data === 'look_all') {
        session.state = "LOOK_ALL_MOVIE"
        const movies = getMovies()

        let message = `❗️                                                                                                              СТРАНИЦА 1\n\n`
        for (let i = 0; i < 7; i++) {
            if (!movies[i]) break
            message += `"${movies[i].code}":\n${moviesList(movies[i])}`
        }
        await bot.editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: pagesKeyboard(movies.length, "look"),
            parse_mode: 'HTML'
        })
    }
    if (query.data === "look_one") {
        session.state = "LOOK_MOVIE_CODE"
        await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши код`, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
        })
    }
}