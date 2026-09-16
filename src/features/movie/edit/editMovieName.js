import {editMovieKeyboard} from "../../../keyboards/editMovie.js";
import {getAddBotSession} from "../../../state/addBotSession.js";

export async function editMovieName(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)

    session.data.name = text
    session.state = 'EDIT_MOVIE'

    await bot.sendMessage(chatId, '✅ Название успешно изменено! Поменять что-то ещё?', {
        reply_markup: editMovieKeyboard()
    })
}