import {addMovie, getMovies} from "../../../services/moviesService.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {moviesList} from "../../../consts/strings.js";

export async function addMovieName(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text
    const username = msg.from.username
    const lastName = msg.from.first_name

    const movies = getMovies()

    const title = text.trim().replace(/\s+/g, ' ');
    const session = getAddBotSession(userId);

    const hasLink = /(https?:\/\/|www\.|t\.me|@)/i.test(title);

    if (hasLink) {
        return bot.sendMessage(chatId, '❌ Ссылки запрещены');
    }

    const valid = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-:(),*.]+$/.test(title);

    if (!valid) {
        return bot.sendMessage(chatId, '❌ Недопустимые символы');
    }

    let lowerCaseValues = []
    movies.map(movie => lowerCaseValues = [...lowerCaseValues, movie.name.toLowerCase()])

    session.data.code = session.data.code ? session.data.code : movies[movies.length - 1].code + 1
    session.data.name = text[0].toUpperCase() + text.slice(1);
    session.state = null
    addMovie(session.data)
    await bot.sendMessage(chatId, `✅ Фильм был добавлен по коду <code>${session.data.code}</code>`, {
        parse_mode: "HTML",
    })
    await bot.sendMessage(8388798577, `${username ? username : lastName} добавил новый фильм по коду ${session.data.code}!!!\n${moviesList(session.data)}`)
    await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм по коду ${session.data.code}!!!\n${moviesList(session.data)}`)
    session.data = {}
    // session.state = 'ADD_MOVIE_GENRE';
    //
    // await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n👇 Укажи жанр', {
    //     reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
    // });
}