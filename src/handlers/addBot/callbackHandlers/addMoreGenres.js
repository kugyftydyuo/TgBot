import {animeGenreKeyboard, filmGenreKeyboard, moreGenresKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {moviesList} from "../../../config/strings.js";
import {addMovie} from "../../../services/moviesService.js";

export async function addMoreGenres(bot, chatId, userId, messageId, query) {
    const more = query.data.slice(11, query.data.length)
    const session = getSession(userId)
    const username = query.from.username
    const lastName = query.from.first_name

    if (more === "on") {
        session.state = "ADD_MOVIE_GENRE"
        await bot.editMessageText("👇                Укажи жанр                 👇", {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
        })
    } else {
        session.state = null
        addMovie(session.data)
        await bot.editMessageText(`✅ Фильм был добавлен по коду <code>${session.data.code}</code>`, {
            parse_mode: "HTML",
            chat_id: chatId,
            message_id: messageId,
        })
        await bot.sendMessage(8501167201, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
        await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм!!!\n${moviesList(session.data)}`)
        session.data = {}
    }
}