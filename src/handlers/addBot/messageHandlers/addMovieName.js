import {getMovies} from "../../../services/moviesService.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function addMovieName(chatId, bot, text, userId) {
    const movies = getMovies()
    const code = movies[movies.length - 1].code + 1

    const title = text.trim().replace(/\s+/g, ' ');
    const session = getSession(userId);

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
        session.data.code = code
        session.data.name = text[0].toUpperCase() + text.slice(1);
        session.state = 'ADD_MOVIE_EPISODES';
    } else {
        session.state = null
        return bot.sendMessage(chatId, `✅ Фильм уже существует по коду ${movies[lowerCaseValues.indexOf(text.toLowerCase())].code}`);
    }

    await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n✍ Напиши количество серий');
}