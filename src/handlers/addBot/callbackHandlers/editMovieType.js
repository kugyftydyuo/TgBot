import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieType(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === "type_anime") {
        session.data.type = "Аниме"
    } else {
        session.data.type = "Дорама"
    }
    session.state = 'EDIT_MOVIE'
    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(chatId, '✅ Тип успешно изменен! Поменять что-то ещё?', {
        reply_markup: editMovieKeyboard()
    })
}