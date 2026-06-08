import {addMovie, editMovie, getMovies} from "../../services/moviesService.js";
import {getSession} from "../../state/sessionAddBot.js";
import {genres, userIds} from "../../config/parallels.js";
import {
    editMovieKeyboard,
    animeGenreKeyboard,
    doramaGenreKeyboard,
    typeKeyboard
} from "../../utils/keyboards.js";
import {getRefs} from "../../services/refsService.js";
import {moviesList} from "../../config/strings.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const username = query.from.username
    const lastName = query.from.first_name

    const session = getSession(userId);

    if (session.state === 'ADD_MOVIE_GENRE') {
        session.data.genre = genres[query.data]
        session.state = null
        addMovie(session.data)
        // await bot.sendMessage(8501167201, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
        // await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
        return bot.sendMessage(chatId, `✅ Фильм был добавлен по коду ${session.data.code}`)
    }

    if (session.state === 'EDIT_MOVIE') {
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

    if (session.state === "EDIT_MOVIE_GENRE") {
        session.data.genre = genres[query.data]
        session.state = 'EDIT_MOVIE'
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '✅ Жанр успешно изменен! Поменять что-то ещё?', {
            reply_markup: editMovieKeyboard()
        })
    }

    if (session.state === "EDIT_MOVIE_TYPE") {
        if (query.data === "type_anime") {
            session.data.type = "Аниме"
        } else {
            session.data.type = "Дорама"
        }
        session.state = 'EDIT_MOVIE'
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, '✅ Тип успешно изменен! Поменять что-то ещё?', {
            reply_markup: editMovieKeyboard()
        })
    }

    if (session.state === "LOOK_MOVIE") {
        if (query.data === 'look_all') {
            session.state = null
            const movies = getMovies()
            const keys = Object.keys(movies)
            const values = Object.values(movies)

            let message = ``
            for (let i = 0; i < keys.length; i++) {
                message += `"${keys[i]}":\n${moviesList(values[i])}`
            }
            await bot.deleteMessage(chatId, messageId)
            return bot.sendMessage(chatId, message)
        }
        if (query.data === "look_one") {
            session.state = "LOOK_MOVIE_CODE"
            await bot.deleteMessage(chatId, messageId)
            return bot.sendMessage(chatId, '✍ Напиши код')
        }
    }

    if (session.state === "LOOK_STATS") {
        const refs = getRefs()
        session.state = null
        if (query.data === "look_stats_my") {
            await bot.deleteMessage(chatId, messageId)
            return bot.sendMessage(chatId, `👨‍💼- ${refs[userIds[userId]]} чел\n💰 - ${refs[userIds[userId]] * 6}₽`)
        }
        if (query.data === "look_stats_all") {
            let message = ``
            const keys = Object.keys(refs)
            const values = Object.values(refs)

            for (let i = 0; i < keys.length; i++) {
                message += `${keys[i]}: ${values[i]}\n`
            }
            await bot.deleteMessage(chatId, messageId)
            return bot.sendMessage(chatId, message)
        }
    }

    if (session.state === "ADD_MOVIE_TYPE") {
        session.state = "ADD_MOVIE_NAME"
        if (query.data === "type_anime") {
            session.data.type = "Аниме"
        } else {
            session.data.type = "Дорама"
        }
        await bot.deleteMessage(chatId, messageId)
        await bot.sendMessage(chatId, "📩 Добавление новой записи...\n\n✍ Напиши название")
    }
}