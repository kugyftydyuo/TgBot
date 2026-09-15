import {getSession} from "../../../state/sessionAddBot.js";
import {typeKeyboard} from "../../../utils/keyboards.js";

export async function addMovieCode(chatId, bot, text, userId) {
    const session = getSession(userId);
    session.data.code = text
    session.state = 'ADD_MOVIE_TYPE';
    await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n❓ Что добавляем?', {
        reply_markup: typeKeyboard()
    });
}