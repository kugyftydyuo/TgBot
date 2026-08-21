import {getSession} from "../../../state/sessionAddBot.js";
import {animeGenreKeyboard, filmGenreKeyboard, editMovieKeyboard} from "../../../utils/keyboards.js";

export async function editMoreGenres(bot, chatId, userId, messageId, query) {
    const more = query.data.slice(11, query.data.length)
    const session = getSession(userId)

    if (more === "on") {
        session.state = "EDIT_MOVIE_GENRE"
        await bot.deleteMessage(chatId, messageId)
        await bot.sendMessage(chatId, '👇                Укажи жанр                 👇', {
            reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
        });
    } else {
        await bot.deleteMessage(chatId, messageId)
        session.state = "EDIT_MOVIE"
        return bot.sendMessage(chatId, '✅ Жанр успешно изменен! Поменять что-то ещё?', {
            reply_markup: editMovieKeyboard()
        })
    }
}