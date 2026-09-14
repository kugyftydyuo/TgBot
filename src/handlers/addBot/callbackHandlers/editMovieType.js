import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {types} from "../../../config/parallels.js";

export async function editMovieType(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)
    const type = query.data.slice(5, query.data.length)

    session.state = 'EDIT_MOVIE'
    session.data.type = types[type]

    await bot.editMessageText(`✅ Тип успешно изменен! Поменять что-то ещё?`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: editMovieKeyboard()
    })
}