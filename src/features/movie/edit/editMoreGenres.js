import {getAddBotSession} from "../../../state/addBotSession.js";
import {animeGenreKeyboard} from "../../../keyboards/animeGenre.js";
import {filmGenreKeyboard} from "../../../keyboards/filmGenre.js";
import {editMovieKeyboard} from "../../../keyboards/editMovie.js";

export async function editMoreGenres(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const more = query.data.replace("more_genre_", "")
    const session = getAddBotSession(userId)

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