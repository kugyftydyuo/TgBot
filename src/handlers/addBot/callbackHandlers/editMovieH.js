import {editMovie, getMovie} from "../../../services/moviesService.js";
import {animeGenreKeyboard, filmGenreKeyboard, typeKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieH(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === "edit_movie_name") {
        session.state = "EDIT_MOVIE_NAME"
        await bot.editMessageText("🛠 Редактирование названия...\n\n✍ Напиши новое название", {
            chat_id: chatId,
            message_id: messageId
        })
    }

    if (query.data === "edit_movie_genre") {
        const movie = getMovie(session.data.code)
        session.state = "EDIT_MOVIE_GENRE"
        await bot.editMessageText("🛠 Редактирование жанра...\n\n👇 Укажи новый жанр", {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: (session.data.type ? session.data.type : movie.type) === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
        })
    }

    if (query.data === "edit_movie_type") {
        session.state = "EDIT_MOVIE_TYPE"
        await bot.editMessageText("🛠 Редактирование типа...\n\n👇 Укажи новый тип", {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: typeKeyboard()
        })
    }

    if (query.data === 'edit_movie_is_ready') {
        session.state = null
        editMovie(session.data)
        session.data = {}
        await bot.editMessageText("✅ Редактирование завершено", {
            chat_id: chatId,
            message_id: messageId
        })
    }
}