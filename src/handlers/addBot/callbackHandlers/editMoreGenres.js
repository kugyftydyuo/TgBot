import {getSession} from "../../../state/sessionAddBot.js";
import {animeGenreKeyboard, filmGenreKeyboard, editMovieKeyboard} from "../../../utils/keyboards.js";

export async function editMoreGenres(bot, chatId, userId, messageId, query) {
    const more = query.data.slice(11, query.data.length)
    const session = getSession(userId)

    if (more === "on") {
        session.state = "EDIT_MOVIE_GENRE"
        await bot.editMessageText('👇                Укажи жанр                 👇', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
        })
    } else {
        session.state = "EDIT_MOVIE"
        await bot.editMessageText('✅ Жанр успешно изменен! Поменять что-то ещё?', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: editMovieKeyboard()
        })
    }
}