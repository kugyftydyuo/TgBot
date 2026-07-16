import {genres} from "../../../config/parallels.js";
import {moreGenresKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieGenre(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    session.data.genre = session.data.genre = session.data.genre ? session.data.genre + genres[query.data] + " " : genres[query.data] + " "
    session.state = 'EDIT_MORE_GENRES'
    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(chatId, `Добавить еще жанр?`, {
        reply_markup: moreGenresKeyboard()
    })
}