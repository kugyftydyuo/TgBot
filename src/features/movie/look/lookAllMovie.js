import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../consts/strings.js";
import {pagesKeyboard} from "../../../keyboards/pages.js";

export async function lookAllMovie(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const page = Number(query.data.slice(10, query.data.length))
    const movies = getMovies()

    let message = `❗️                                                                                                              СТРАНИЦА ${page}\n\n`
    for (let i = (page - 1) * 5; i < page * 5; i++) {
        if (!movies[i]) break
        message += `"${movies[i].code}":\n${moviesList(movies[i])}`
    }

    try {
        await bot.editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: pagesKeyboard(movies.length, "look")
        })
    } catch {
        await bot.sendMessage(chatId, "Ты уже на этой странице!")
    }
}