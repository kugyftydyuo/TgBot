import {editMovieKeyboard} from "../../../keyboards/editMovie.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {types} from "../../../config/parallels.js";

export async function editMovieType(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)
    const type = query.data.replace("type_", "")

    session.state = 'EDIT_MOVIE'
    session.data.type = types[type]

    await bot.editMessageText(`✅ Тип успешно изменен! Поменять что-то ещё?`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: editMovieKeyboard()
    })
}