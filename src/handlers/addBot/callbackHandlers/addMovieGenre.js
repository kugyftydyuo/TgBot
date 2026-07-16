import {genres} from "../../../config/parallels.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {moreGenresKeyboard} from "../../../utils/keyboards.js";

export async function addMovieGenre(query, userId, chatId, bot, messageId) {
    const session = getSession(userId)

    session.data.genre = session.data.genre ? session.data.genre + genres[query.data] + " " : genres[query.data] + " "
    session.state = "ADD_MORE_GENRES"

    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(chatId, `Добавить еще жанр?`, {
        reply_markup: moreGenresKeyboard()
    })
}