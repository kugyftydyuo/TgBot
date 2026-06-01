import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieEpisodes(chatId, bot, text, userId) {
    const session = getSession(userId)

    if (isNaN(text)) {
        return bot.sendMessage(chatId, '❌ Введи число');
    }

    session.data.episodes = text
    session.state = 'EDIT_MOVIE'

    await bot.sendMessage(chatId, '✅ Кол-во серий успешно изменено! Поменять что-то ещё?', {
        reply_markup: editMovieKeyboard()
    })
}