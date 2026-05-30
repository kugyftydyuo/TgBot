import {workers} from "../../config/workers.js";
import {addMovieState, getMovies} from "../../services/moviesService.js";
import {genreKeyboard} from "../../utils/keyboards.js";

export async function addHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const name = msg.text

    if (workers.includes(userId)) {
        const words = name.split(' ')
        const newName = words.slice(2, words.length).join(' ')
        const series = words[1]

        if (words.length < 3) {
            return bot.sendMessage(chatId, 'Чтобы добавить фильм введи /add кол-во_серий название')
        } else {
            const movies = getMovies()
            const keys = Object.keys(movies)
            const values = Object.values(movies)
            const code = Number(keys[keys.length - 1]) + 1

            const title = newName.trim().replace(/\s+/g, ' ');

            const hasLink = /(https?:\/\/|www\.|t\.me|@)/i.test(title);

            if (hasLink) {
                return bot.sendMessage(chatId, '❌ Ссылки запрещены');
            }

            const valid = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-:(),*.]+$/.test(title);

            if (!valid) {
                return bot.sendMessage(chatId, '❌ Недопустимые символы');
            }

            let lowerCaseValues = []
            values.map(movie => lowerCaseValues = [...lowerCaseValues, movie.name.toLowerCase()])

            if (!lowerCaseValues.includes(newName.toLowerCase())) {
                addMovieState(userId, newName, series, code, "add")
                return bot.sendMessage(chatId, "Укажи жанр нажав на кнопку", {
                    reply_markup: genreKeyboard()
                });
            } else {
                return bot.sendMessage(chatId, `✅ Фильм уже существует по коду ${keys[values.indexOf(newName)]}`);
            }
        }
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}