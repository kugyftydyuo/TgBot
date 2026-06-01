import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieName(chatId, bot, text, userId) {
    const session = getSession(userId)

    session.data.name = text
    session.state = 'EDIT_MOVIE'

    await bot.sendMessage(chatId, '✅ Название успешно изменено! Поменять что-то ещё?', {
        reply_markup: editMovieKeyboard()
    })
}