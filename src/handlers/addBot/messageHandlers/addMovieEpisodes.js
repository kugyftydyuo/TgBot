import {genreKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function addMovieEpisodes(chatId, bot, text, userId) {
    const session = getSession(userId)

    if (isNaN(text)) {
        return bot.sendMessage(chatId, '❌ Введи число');
    }

    session.data.episodes = Number(text);
    session.state = 'ADD_MOVIE_GENRE';

    await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n👇 Укажи жанр', {
        reply_markup: genreKeyboard()
    });
}