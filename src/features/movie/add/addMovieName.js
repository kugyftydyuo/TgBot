import {getMovies} from "../../../services/moviesService.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {animeGenreKeyboard} from "../../../keyboards/animeGenre.js";
import {filmGenreKeyboard} from "../../../keyboards/filmGenre.js";

export async function addMovieName(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

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

    if (!lowerCaseValues.includes(text.toLowerCase())) {
        session.data.code = session.data.code ? session.data.code : movies[movies.length - 1].code + 1
        session.data.name = text[0].toUpperCase() + text.slice(1);
        session.state = 'ADD_MOVIE_GENRE';
    } else {
        session.state = null
        return bot.sendMessage(chatId, `✅ Фильм уже существует по коду ${movies[lowerCaseValues.indexOf(text.toLowerCase())].code}`);
    }

    await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n👇 Укажи жанр', {
        reply_markup: session.data.type === "Аниме" ? animeGenreKeyboard() : filmGenreKeyboard()
    });
}