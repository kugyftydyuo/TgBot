import {editMovie, getMovies} from "../../../services/moviesService.js";
import {animeGenreKeyboard, doramaGenreKeyboard, typeKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function editMovieH(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === "edit_movie_name") {
        session.state = "EDIT_MOVIE_NAME"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '🛠 Редактирование названия...\n\n✍ Напиши новое название')
    }

    if (query.data === "edit_movie_episodes") {
        session.state = "EDIT_MOVIE_EPISODES"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '🛠 Редактирование количества серий...\n\n✍ Напиши новое количество серий')
    }

    if (query.data === "edit_movie_genre") {
        const movies = getMovies()
        session.state = "EDIT_MOVIE_GENRE"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '🛠 Редактирование жанра...\n\n👇 Укажи новый жанр', {
            reply_markup: (session.data.type ? session.data.type : movies[session.data.code].type) === "Аниме" ? animeGenreKeyboard() : doramaGenreKeyboard()
        })
    }

    if (query.data === "edit_movie_type") {
        session.state = "EDIT_MOVIE_TYPE"
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '🛠 Редактирование типа...\n\n👇 Укажи новый тип', {
            reply_markup: typeKeyboard()
        })
    }

    if (query.data === 'edit_movie_is_ready') {
        session.state = null
        editMovie(session.data)
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, "✅ Редактирование завершено")
    }
}