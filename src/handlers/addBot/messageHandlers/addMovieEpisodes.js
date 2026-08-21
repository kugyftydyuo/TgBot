import {animeGenreKeyboard, filmGenreKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function addMovieEpisodes(chatId, bot, text, userId) {
    const session = getSession(userId)

    session.data.episodes = text;
    session.state = 'ADD_MOVIE_GENRE';

    await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n👇 Укажи жанр', {
        reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
    });
}