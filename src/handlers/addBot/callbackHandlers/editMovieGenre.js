import {genres} from "../../../config/parallels.js";
import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieGenre(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    session.data.genre = genres[query.data]
    session.state = 'EDIT_MOVIE'
    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(chatId, '✅ Жанр успешно изменен! Поменять что-то ещё?', {
        reply_markup: editMovieKeyboard()
    })
}