import {editMovie, getMovie} from "../../../services/moviesService.js";
import {animeGenreKeyboard} from "../../../keyboards/animeGenre.js";
import {filmGenreKeyboard} from "../../../keyboards/filmGenre.js";
import {typeKeyboard} from "../../../keyboards/type.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {emojis} from "../../../config/emojis.js";

export async function editMovieH(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    if (query.data === "edit_movie_name") {
        session.state = "EDIT_MOVIE_NAME"
        await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.tool }\'>👍</tg-emoji> Редактирование названия...\n\n<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши новое название`, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
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
        await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.check3 }\'>👍</tg-emoji> Редактирование завершено`, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
        })
    }
}