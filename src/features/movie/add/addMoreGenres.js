import {animeGenreKeyboard} from "../../../keyboards/animeGenre.js";
import {filmGenreKeyboard} from "../../../keyboards/filmGenre.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {moviesList} from "../../../consts/strings.js";
import {addMovie} from "../../../services/moviesService.js";

export async function addMoreGenres(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const more = query.data.replace("more_genre_", "")
    const session = getAddBotSession(userId)
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