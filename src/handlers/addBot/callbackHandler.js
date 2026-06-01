import {addMovie, editMovie, getMovies} from "../../services/moviesService.js";
import {getSession} from "../../state/sessionAddBot.js";
import {genres} from "../../config/parallels.js";
import {editMovieKeyboard, genreKeyboard} from "../../utils/keyboards.js";

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
        await bot.sendMessage(8501167201, `${username ? username : lastName} добавил новый фильм!!!\n🗯 Название: ${session.data.name}\n📒 Кол-во серий: ${session.data.episodes}\n🎬 Жанр: ${session.data.genre}`)
        await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм!!!\n🗯 Название: ${session.data.name}\n📒 Кол-во серий: ${session.data.episodes}\n🎬 Жанр: ${session.data.genre}`)
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
            session.state = "EDIT_MOVIE_GENRE"
            await bot.deleteMessage(chatId, messageId)
            return bot.sendMessage(chatId, '🛠 Редактирование жанра...\n\n👇 Укажи новый жанр', {
                reply_markup: genreKeyboard()
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

    if (session.state === "LOOK_MOVIE") {
        if (query.data === 'look_all') {
            session.state = null
            const movies = getMovies()
            const keys = Object.keys(movies)
            const values = Object.values(movies)

            let message = ``
            for (let i = 0; i < keys.length; i++) {
                message += `"${keys[i]}":\n🗯 Название: ${values[i].name}\n📒 Кол-во серий: ${values[i].episodes}\n🎬 Жанр: ${values[i].genre}\n\n`
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
}