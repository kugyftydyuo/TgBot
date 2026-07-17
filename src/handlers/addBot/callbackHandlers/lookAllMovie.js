import {getMovies} from "../../../services/moviesService.js";
import {moviesList} from "../../../config/strings.js";
import {pagesKeyboard} from "../../../utils/keyboards.js";

export async function lookAllMovie(bot, chatId, userId, messageId, query) {
    const page = Number(query.data.slice(10, query.data.length))
    const movies = getMovies()
    const keys = Object.keys(movies)
    const values = Object.values(movies)

    let message = `❗️                                                                                                              СТРАНИЦА ${page}\n\n`
    for (let i = (page - 1) * 5; i < page * 5; i++) {
        if (!keys[i]) break
        message += `"${keys[i]}":\n${moviesList(values[i])}`
    }

    try {
        await bot.editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: pagesKeyboard(keys.length, "look")
        })
    } catch {
        await bot.sendMessage(chatId, "Ты уже на этой странице!")
    }
}